const authorize = require('./authorize');
const express = require('express');
const getAlgorithm = require('./algorithm_functions/getAlgorithm');
const postAlgorithm = require('./algorithm_functions/postAlgorithm');
// const patchAlgorithm = require('./algorithm_functions/patchAlgorithm');

const router = express.Router();

router.get('/dashboard/:water_systems_id', authorize, getAlgorithm);
router.post('/dashboard/:water_systems_id', authorize, postAlgorithm);
// router.patch('/dashboard/:water_systems_id', authorize, patchAlgorithm);

module.exports = router;
