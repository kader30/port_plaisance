var express = require('express');
var router = express.Router();
const authJWT = require('../middleware/authJWT');

const serviceUser = require('../services/users.services');

/* GET users listing. */
router.get('/', authJWT, serviceUser.getAllUsers);

// ajouter les autres routes CRUD pour les utilisateurs (POST, PUT, DELETE)
// POST /users - créer un nouvel utilisateur
router.post('/', authJWT, serviceUser.createUser);

// GET /users/:email - récupérer les détails d'un utilisateur
router.get('/:email', authJWT, serviceUser.getUserByEmail);
// PUT /users/:email - mettre à jour un utilisateur
router.put('/:email', authJWT, serviceUser.updateUser);
// DELETE /users/:email - supprimer un utilisateur
router.delete('/:email', authJWT, serviceUser.deleteUser);

module.exports = router;
