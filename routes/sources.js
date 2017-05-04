const authorize = require('./authorize');
const express = require('express');
const getSources = require('./sources_functions/getSources');
const deleteSources = require('./sources_functions/deleteSources');
const postSources = require('./sources_functions/postSources');
const patchSources = require('./sources_functions/patchSources');

const router = express.Router();

router.delete('/sources/:source_id', authorize, deleteSources);
router.get('/sources/:water_systems_id', authorize, getSources);
router.patch('/sources/:source_id', authorize, patchSources);
router.post('/sources', authorize, postSources);

module.exports = router;
