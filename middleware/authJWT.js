/**
 * @file Middleware d’authentification JWT basé sur les cookies.
 * @module middleware/authJWT
 *
 * @description
 * Vérifie la présence d’un token JWT dans les cookies du client.
 * Si le token est valide :
 * - il est décodé
 * - les informations utilisateur sont ajoutées à `req.user`
 * - la requête continue vers le middleware suivant
 *
 * Si le token est absent ou invalide :
 * - l’utilisateur est redirigé vers la page d’accueil
 */

const jwt = require("jsonwebtoken");

/**
 * Middleware d’authentification JWT.
 *
 * @returns {void}
 *
 * @example
 * // Utilisation dans app.js
 * app.get('/dashboard', authJWT, (req, res) => {
 *   res.render('dashboard', { user: req.user });
 * });
 */
module.exports = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.redirect("/");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/");
  }
};
