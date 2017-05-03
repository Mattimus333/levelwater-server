const authorize = require('./authorize');
const express = require('express');
const getAlgorithm = require('./algorithm_functions/getAlgorithm');
const getInfoFromTables = require('./algorithm_functions/postAlgorithm');
// const patchAlgorithm = require('./algorithm_functions/patchAlgorithm');

const router = express.Router();

router.get('/algorithm-results/:water_systems_id', authorize, getAlgorithm);
router.post('/algorithm-results/:water_systems_id', authorize, getInfoFromTables);
// router.patch('/dashboard/:water_systems_id', authorize, patchAlgorithm);

module.exports = router;
