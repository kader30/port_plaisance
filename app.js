/**
 * @file Configuration principale de l'application Express.
 * @module app/API
 *
 * @description
 * Ce module initialise et configure l'application Express :
 * - connexion à la base MongoDB
 * - configuration du moteur de vues EJS
 * - middlewares globaux (logger, body-parser, cookies, layouts)
 * - routes Pages (EJS) et routes API
 * - gestion des erreurs (404 + erreurs serveur)
 *
 * L'application est ensuite exportée pour être utilisée par le serveur HTTP.
 */


/**
 * Dépendances principales de l'application :
 * - express : framework HTTP
 * - http-errors : gestion des erreurs HTTP
 * - morgan : logger HTTP
 * - cookie-parser : gestion des cookies
 * - express-ejs-layouts : gestion des layouts EJS
 * - method-override : support des méthodes PUT/DELETE via formulaires
 */
createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
var usersRouter = require('./routes/users.routes');
const mongoDB = require('./data_base/port_russellDb');
const authJWT = require('./middleware/authJWT');

//Routes Pages
const usersPages = require('./pages/users.pages');
const catwaysPages = require('./pages/catways.pages');
const reservationsPages = require('./pages/reservations.pages');
//Routes API
const authRoutes = require('./routes/routes.auth');
const userRoutes = require('./routes/users.routes');
const catwayRoutes = require('./routes/catways.routes');
const reservationRoutes = require('./routes/reservations.routes');

/**
 * Initialise la connexion MongoDB via le module dédié.
 * @see module:data_base/port_russellDb
 */
mongoDB.initClientDbConnection();
/**
 * Instance principale de l'application Express.
 * @constant
 */
var app = express();
app.use((req, res, next) => { res.locals.secured = false; // par défaut : route non sécurisée
 next(); });
/**
 * Configuration du moteur de vues :
 * - utilisation de EJS
 * - activation des layouts via express-ejs-layouts
 */
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
/**
 * Middlewares globaux :
 * - logger HTTP (morgan)
 * - parsing JSON et URL-encoded
 * - parsing des cookies
 * - support PUT/DELETE via ?_method=
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

/**
 * Page d'accueil.
 * @route GET /
 */

app.get('/', (req, res) => res.render('index', { title: "Accueil" }));

/**
 * Page Dashboard (protégée par JWT).
 * @route GET /dashboard
 */
app.get('/dashboard', authJWT, (req, res) => {
  const today = new Date();
  res.render('dashboard', { title: "Dashboard", user: req.user, today });
});

/**
 * Routes EJS pour les pages utilisateurs, catways et réservations.
 * @see module:pages/users
 * @see module:pages/catways
 * @see module:pages/reservations
 */
app.use('/users', usersPages);
app.use('/catways', catwaysPages);
app.use('/catways', reservationsPages);
app.use('/reservations', reservationsPages);

/**
 * Documentation JSDoc servie statiquement.
 * @route GET /docs
 */
app.use('/docs', express.static('docs'));

/**
 * Routes API :
 * - authentification
 * - utilisateurs
 * - catways
 * - réservations
 *
 * @see module:routes/routes.auth
 * @see module:routes/users.routes
 * @see module:routes/catways.routes
 * @see module:routes/reservations.routes
 */
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/catways', reservationRoutes);

/**
 * Middleware de gestion des erreurs 404.
 * @function
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Middleware global de gestion des erreurs.
 *
 * @function
 * @param {Error} err - Erreur capturée
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 *
 * @description
 * Affiche une page d'erreur EJS avec :
 * - le message d'erreur
 * - les détails uniquement en mode développement
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: "Erreur", error: err, message: err.message });
});

/**
 * Exporte l'application Express pour utilisation par le serveur HTTP.
 * @exports app
 */
module.exports = app;
