/**
 * @file Modèle Mongoose représentant un catway.
 * @module models/Catway
 *
 * @description
 * Définit le schéma Catway, utilisé pour gérer :
 * - le numéro du catway
 * - son type (long ou short)
 * - son état (OK ou autre)
 */

const mongoose = require('mongoose');

/**
 * Représente un catway dans le port.
 *
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Numéro unique du catway.
 * @property {string} catwayType - Type du catway (`long` ou `short`).
 * @property {string} catwayState - État du catway (par défaut `OK`).
 */
const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true, unique: true },
  catwayType:   { type: String, enum: ['long', 'short'], required: true },
  catwayState:  { type: String, default: 'OK' }
});

/**
 * Modèle Mongoose Catway.
 * @type {mongoose.Model<Catway>}
 */
module.exports = mongoose.model('Catway', catwaySchema);
