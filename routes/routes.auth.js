const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Identifiants incorrects");

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).send("Identifiants incorrects");

  // Génération du token JWT
  const token = jwt.sign(
    { username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  // Stockage du token dans un cookie sécurisé
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // mettre true en HTTPS
    maxAge: 2 * 60 * 60 * 1000
  });

  res.redirect('/dashboard');

});

// 🚀 ROUTE LOGOUT 
router.get('/logout', (req, res) => { res.clearCookie("token"); res.redirect('/'); });
module.exports = router;
