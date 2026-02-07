/**
 * @file Modèle Mongoose représentant un utilisateur.
 * @module models/User
 *
 * @description
 * Définit le schéma User ainsi que :
 * - le hash automatique du mot de passe avant sauvegarde
 * - une méthode d’instance pour comparer un mot de passe en clair
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Représente un utilisateur enregistré dans la base.
 *
 * @typedef {Object} User
 * @property {string} username - Nom d'utilisateur.
 * @property {string} email - Adresse email unique.
 * @property {string} password - Mot de passe hashé.
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

/**
 * Hash automatiquement le mot de passe avant la sauvegarde.
 *
 * @function
 * @name preSave
 * @memberof module:models/User~User
 * @description
 * Si le mot de passe a été modifié, il est hashé avec bcrypt
 * avant d’être enregistré en base.
 *
 * @param {Function} next - Callback permettant de poursuivre la sauvegarde.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Compare un mot de passe en clair avec le mot de passe hashé.
 *
 * @function comparePassword
 * @memberof module:models/User~User
 * @instance
 *
 * @param {string} password - Mot de passe en clair à vérifier.
 * @returns {Promise<boolean>} Résultat de la comparaison.
 */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

/**
 * Modèle Mongoose User.
 * @type {mongoose.Model<User>}
 */
module.exports = mongoose.model('User', userSchema);
