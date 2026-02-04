const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

const authJWT = require('../middleware/authJWT');

// LISTE
router.get('/', authJWT, async (req, res) => {
  const catways = await Catway.find();
  res.render('catways/list', { title: "Liste des catways", catways });
});

// PAGE CRÉATION
router.get('/create', authJWT, (req, res) => {
  res.render('catways/create', { title: "Créer un catway" });
});

// PAGE DÉTAILS
router.get('/:id', authJWT, async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  res.render('catways/detail', { title: "Détails catway", catway });
});

// PAGE ÉDITION
router.get('/:id/edit', authJWT, async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  res.render('catways/edit', { title: "Modifier catway", catway });
});

module.exports = router;
