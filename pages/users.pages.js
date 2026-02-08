const express = require('express');
const router = express.Router();
const User = require('../models/User');

const authJWT = require('../middleware/authJWT');
// LISTE
router.get('/', authJWT, async (req, res) => {
    const users = await User.find();
    res.render('users/list', { title: "Liste des utilisateurs", users });
});

// PAGE CRÉATION
router.get('/create', authJWT, (req, res) => {
    res.render('users/create', { title: "Créer un utilisateur" });
});

// PAGE DÉTAILS
router.get('/:email', authJWT, async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    res.render('users/detail', { title: "Détails utilisateur", user });
});

// PAGE ÉDITION
router.get('/:email/edit', authJWT, async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    res.render('users/edit', { title: "Modifier utilisateur", user });
});

module.exports = router;
