/**
 * @file Gestion CRUD des catways.
 * @module Services/catways
 * @description
 * Ce module regroupe les handlers Express permettant :
 * - d’obtenir tous les catways
 * - de récupérer un catway par numéro
 * - de créer un catway
 * - de mettre à jour un catway
 * - de supprimer un catway
 */

const Catway = require('../models/Catway');

/**
 * Récupère tous les catways.
 *
 * @async
 * @function getAllCatways
 * @param {Request} req
 * @param {Response} res - Retourne un JSON contenant la liste des catways
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.getAllCatways = async (req, res, next) => {
    try {
        const catways = await Catway.find({});
        res.json(catways);
    } catch (error) {
        next(error);
    }
};

/**
 * Récupère un catway via son numéro.
 *
 * @async
 * @function getCatwayByNumber
 * @param {Request} req - Contient `req.params.id` (numéro du catway)
 * @param {Response} res - Retourne un JSON contenant le catway
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.getCatwayByNumber = async (req, res, next) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        res.json(catway);
    } catch (error) {
        next(error);
    }
};

/**
 * Crée un nouveau catway.
 *
 * @async
 * @function createCatway
 * @param {Request} req - Données du catway dans `req.body`
 * @param {Response} res - Retourne le catway créé en JSON
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.createCatway = async (req, res, next) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();

      res.redirect('/catways');
    } catch (error) {
        next(error);
    }
};

/**
 * Met à jour un catway via son numéro.
 *
 * @async
 * @function updateCatway
 * @param {Request} req - Contient `req.params.id` et les données à mettre à jour
 * @param {Response} res - Redirige vers /catways après mise à jour
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.updateCatway = async (req, res, next) => {
    try {
        const updatedCatway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        res.redirect('/catways');
    } catch (error) {
        next(error);
    }
};

/**
 * Supprime un catway via son numéro.
 *
 * @async
 * @function deleteCatway
 * @param {Request} req - Contient `req.params.id`
 * @param {Response} res - Retourne un statut 204 si suppression réussie
 * @param {Next} next
 * @returns {Promise<void>}
 */
exports.deleteCatway = async (req, res, next) => {
    try {
        const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });

        if (!deletedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

       res.redirect('/catways');
    } catch (error) {
        next(error);
    }
};
