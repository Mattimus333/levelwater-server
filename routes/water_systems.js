const express = require('express');
const authorize = require('./authorize');
const postWaterSystem = require('./waterSys_functions/postWaterSystem');
const getWaterSystem = require('./waterSys_functions/getWaterSystem');

const router = express.Router();

router.get('/water_systems/:waterSystemId', authorize, getWaterSystem);
router.post('/water_systems', authorize, postWaterSystem);

module.exports = router;
