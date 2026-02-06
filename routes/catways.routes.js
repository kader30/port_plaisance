const express = require('express');
const router = express.Router();
const catwayService = require('../services/catways.service');
const authJWT = require('../middleware/authJWT');
router.get('/', authJWT, catwayService.getAllCatways);

router.get('/:id', authJWT, catwayService.getCatwayByNumber);

router.post('/', authJWT, catwayService.createCatway);

router.put('/:id', authJWT, catwayService.updateCatway);

router.delete('/:id', authJWT, catwayService.deleteCatway);

module.exports = router;
