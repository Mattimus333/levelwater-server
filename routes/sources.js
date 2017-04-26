const authorize = require('./authorize');
const express = require('express');
const getSources = require('./sources_functions/getSources');
const deleteSources = require('./sources_functions/deleteSources');

const router = express.Router();

router.get('/sources/:water_systems_id', authorize, getSources);
router.delete('/sources/:source_id', authorize, deleteSources);

module.exports = router;
