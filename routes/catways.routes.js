const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

const authJWT = require('../middleware/authJWT');
router.get('/', authJWT, async (req, res) => {
  res.json(await Catway.find());
});

router.get('/:id', authJWT, async (req, res) => {
  res.json(await Catway.findOne({ catwayNumber: req.params.id }));
});

router.post('/', authJWT, async (req, res) => {
  const catway = new Catway(req.body);
  await catway.save();
  res.status(201).json(catway);
});

router.put('/:id', authJWT, async (req, res) => {
  res.json(await Catway.findOneAndUpdate(
    { catwayNumber: req.params.id },
    { catwayState: req.body.catwayState },
    { new: true }
  ));
});

router.delete('/:id', authJWT, async (req, res) => {
  await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  res.status(204).send();
});

module.exports = router;
