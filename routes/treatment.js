const authorize = require('./authorize');
const express = require('express');
const getTreatment = require('./treatment_functions/getTreatment');
const deleteTreatment = require('./treatment_functions/deleteTreatment');
const patchTreatment = require('./treatment_functions/patchTreatment');
const postTreatment = require('./treatment_functions/postTreatment');

const router = express.Router();

router.get('/treatment/:water_systems_id', authorize, getTreatment);
router.post('/treatment', authorize, postTreatment);
router.patch('/treatment/:treatment_id', authorize, patchTreatment);
router.delete('/treatment/:treatment_id', authorize, deleteTreatment);

module.exports = router;
