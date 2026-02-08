/**
 * @file Gestion CRUD des utilisateurs.
 * @module Services/users
 * @description
 * Ce module regroupe les handlers Express permettant :
 * - d’obtenir tous les utilisateurs
 * - de récupérer un utilisateur par email
 * - de créer un utilisateur
 * - de mettre à jour un utilisateur
 * - de supprimer un utilisateur
 */



const User = require('../models/User');

/**
 * Récupère tous les utilisateurs.
 *
 * @async
 * @function getAllUsers
 * @param {Request} req
 * @param {Response} res - Retourne un JSON contenant la liste des utilisateurs
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * Récupère un utilisateur via son email.
 *
 * @async
 * @function getUserByEmail
 * @param {Request} req - Contient `req.params.email`
 * @param {Response} res - Retourne un JSON contenant l’utilisateur
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.getUserByEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Crée un nouvel utilisateur.
 *
 * @async
 * @function createUser
 * @param {Request} req - Données du nouvel utilisateur dans `req.body`
 * @param {Response} res - Redirige vers /users après création
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201);
        res.redirect('/users');
    } catch (error) {
        next(error);
    }
};

/**
 * Met à jour un utilisateur via son email.
 *
 * @async
 * @function updateUser
 * @param {Request} req - Contient `req.params.email` et les données à mettre à jour
 * @param {Response} res - Redirige vers /users après mise à jour
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.redirect('/users');
    } catch (error) {
        next(error);
    }
};

/**
 * Supprime un utilisateur via son email.
 *
 * @async
 * @function deleteUser
 * @param {Request} req - Contient `req.params.email`
 * @param {Response} res - Retourne un statut 204 puis redirige
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findOneAndDelete({ email: req.params.email });

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

       
        res.redirect('/users');
    } catch (error) {
        next(error);
    }
};
