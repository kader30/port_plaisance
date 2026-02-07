/**
 * @file Gestion des pages liées aux réservations (CRUD + vues EJS).
* @module Services/reservations
 * @description
 * Ce module contient les handlers Express permettant :
 * - d’afficher les réservations d’un catway
 * - d’afficher les formulaires de création et d’édition
 * - de créer, modifier et supprimer une réservation
 */


const Reservation = require('../models/Reservation');

// LISTE DES RÉSERVATIONS D’UN CATWAY

exports.getReservationsByCatway = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.render('reservations/list', {
            title: "Réservations du catway " + req.params.id,
            reservations,
            catwayNumber: req.params.id
        });
    } catch (error) {
        next(error);
    }
};

// PAGE FORMULAIRE DE CRÉATION
/**
 * Affiche la page du formulaire de création d’une réservation.
 *
 * @async
 * @function CreateReservation
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.CreateReservation = async (req, res, next) => {
    try {
        res.render('reservations/create', {
            title: "Créer une réservation",
            catwayNumber: req.params.id
        });
    } catch (error) {
        next(error);
    }
};

// CRÉATION
/**
 * Crée une nouvelle réservation.
 *
 * @async
 * @function createReservation
 * @param {Request} req - Données envoyées par le formulaire
 * @param {Response} res
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.createReservation = async (req, res, next) => {
    try {
        const newReservation = new Reservation({
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            catwayNumber: req.params.id
        });

        await newReservation.save();
        res.redirect(`/catways/${req.params.id}/reservations`);
    } catch (error) {
        next(error);
    }
};

// PAGE ÉDITION
// Affiche la page d’édition d’une réservation.

exports.EditReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.resId);

        res.render('reservations/edit', {
            title: "Modifier réservation",
            reservation,
            catwayNumber: req.params.id
        });
    } catch (error) {
        next(error);
    }
};

// MISE À JOUR
/**
 * Met à jour une réservation existante.
 *
 * @async
 * @function updateReservation
 * @param {Request} req - Données mises à jour
 * @param {Response} res
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.updateReservation = async (req, res, next) => {
    try {
        await Reservation.findByIdAndUpdate(req.params.resId, req.body);
        res.redirect(`/catways/${req.params.id}/reservations`);
    } catch (error) {
        next(error);
    }
};

//delete reservation
/**
 * Supprime une réservation.
 *
 * @async
 * @function deleteReservation
 * @param {Request} req - Contient `req.params.resId`
 * @param {Response} res
 * @param {Next} next
 * @returns {Promise<void>}
 * @throws {Error} Si la réservation n’existe pas
 */
exports.deleteReservation = async (req, res, next) => {
    try {
        const deleted = await Reservation.findByIdAndDelete(req.params.resId);

        if (!deleted) {
            throw new Error("Réservation non trouvée");
        }

        res.redirect(`/catways/${req.params.id}/reservations`);
    } catch (error) {
        next(error);
    }
};

