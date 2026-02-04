var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

var usersRouter = require('./routes/users.routes');
const mongoDB = require('./data_base/port_russellDb');
const authJWT = require('./middleware/authJWT');
//Routes Pages
const usersPages =  require('./pages/users.pages');
const catwaysPages =  require('./pages/catways.pages');
const reservationsPages =  require('./pages/reservations.pages');
//Routes API
const authRoutes = require('./routes/routes.auth');
const userRoutes = require('./routes/users.routes');
const catwayRoutes = require('./routes/catways.routes');
const reservationRoutes = require('./routes/reservations.routes');
mongoDB.initClientDbConnection();
var app = express();
//Middleware pour parser le body des requêtes
app.use(expressLayouts);
app.set('layout', 'layout');
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
// PAGE ACCUEIL
app.get('/', (req, res) => res.render('index', { title: "Accueil" }));
app.get('/dashboard', authJWT, (req, res) => { 
    const today = new Date();
    res.render('dashboard', { title: "Dashboard", user: req.user, today }); });
// ROUTES PAGES (EJS)
app.use('/users', usersPages);
app.use('/catways', catwaysPages);
app.use('/catways', reservationsPages);
app.use('/reservations', reservationsPages);


// ROUTES API
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);

// LANCEMENT SERVEUR
app.listen(process.env.PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`)
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
