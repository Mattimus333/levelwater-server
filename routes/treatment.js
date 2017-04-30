const authorize = require('./authorize');
const express = require('express');
const getTreatment = require('./treatment_functions/getTreatment');
const postTreatment = require('./treatment_functions/postTreatment');

const router = express.Router();

router.get('/treatment/:water_systems_id', authorize, getTreatment);
router.post('/treatment', authorize, postTreatment);
