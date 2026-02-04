var express = require('express');
var router = express.Router();

const serviceUser = require('../services/users.services');

/* GET users listing. */
router.get('/', serviceUser.getAllUsers);

module.exports = router;
