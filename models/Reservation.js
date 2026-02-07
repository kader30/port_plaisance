/**
 * @file Modèle Mongoose représentant une reservation.
 * @module models/Reservation
 *
 * @description
 * Définit le schéma Reservation, utilisé pour gérer :
 * - le nom du client
 * - le nom du bateau
 * - le numéro du catway associé
 * - les dates de début et de fin de la réservation
 * - son type (long ou short)
 * - son état (OK ou autre)
 */

/**
 * @typedef Reservation
 * @property {string} clientName - Nom du client
 * @property {string} boatName - Nom du bateau
 * @property {number} catwayNumber - Numéro du catway associé
 * @property {Date} startDate - Date de début de la réservation
 * @property {Date} endDate - Date de fin de la réservation
 */



const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: { type: String, required: true },
  boatName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
