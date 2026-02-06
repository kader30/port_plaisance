const express = require('express');
const router = express.Router({ mergeParams: true });
const serviceReservation = require('../services/reservations.service');
const authJWT = require('../middleware/authJWT');

// LISTE DES RÉSERVATIONS D’UN CATWAY
router.get('/:id/reservations', authJWT, serviceReservation.getReservationsByCatway);   
// PAGE CRÉATION
router.get('/:id/reservations/create', authJWT, serviceReservation.CreateReservation);

// CRÉATION
  router.post('/:id/reservations', authJWT, serviceReservation.createReservation);



// PAGE ÉDITION
  router.get('/:id/reservations/:resId/edit', authJWT, serviceReservation.EditReservation);

// MISE À JOUR
  router.put('/:id/reservations/:resId', authJWT, serviceReservation.updateReservation); 

// SUPPRESSION
  router.delete('/:id/reservations/:resId', authJWT, serviceReservation.deleteReservation);

module.exports = router;
