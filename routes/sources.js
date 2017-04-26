const authorize = require('./authorize');
const express = require('express');
const getSources = require('./sources_functions/getSources');

const router = express.Router();

router.get('/sources/:water_systems_id', authorize, getSources);

module.exports = router;
