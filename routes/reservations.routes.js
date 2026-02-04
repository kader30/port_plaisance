const express = require('express');
const router = express.Router({ mergeParams: true });
const Reservation = require('../models/Reservation');
const authJWT = require('../middleware/authJWT');

// LISTE DES RÉSERVATIONS D’UN CATWAY
router.get('/:id/reservations', authJWT, async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });

  res.render('reservations/list', {
    title: "Réservations",
    reservations,
    catwayNumber: req.params.id
  });
});

// PAGE CRÉATION
router.get('/:id/reservations/create', authJWT, (req, res) => {
  res.render('reservations/create', {
    title: "Créer une réservation",
    catwayNumber: req.params.id
  });
});

// CRÉATION
router.post('/:id/reservations', authJWT, async (req, res) => {
  const reservation = new Reservation({
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    catwayNumber: req.params.id
  });

  await reservation.save();

  res.redirect(`/catways/${req.params.id}/reservations`);
});

// PAGE DÉTAILS
router.get('/:id/reservations/:resId', authJWT, async (req, res) => {
  const reservation = await Reservation.findById(req.params.resId);

  res.render('reservations/detail', {
    title: "Détails réservation",
    reservation,
    catwayNumber: req.params.id
  });
});

// PAGE ÉDITION
router.get('/:id/reservations/:resId/edit', authJWT, async (req, res) => {
  const reservation = await Reservation.findById(req.params.resId);

  res.render('reservations/edit', {
    title: "Modifier réservation",
    reservation,
    catwayNumber: req.params.id
  });
});

module.exports = router;
