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
exports.updateReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndUpdate(req.params.resId, req.body);
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    next(error);
  }
};

//delete reservation
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

