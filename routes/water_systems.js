const express = require('express');
const authorize = require('./authorize');
const getWaterSystem = require('./waterSys_functions/getWaterSystem');
const postWaterSystem = require('./waterSys_functions/postWaterSystem');
const deleteWaterSystem = require('./waterSys_functions/deleteWaterSystem');
const putWaterSystem = require('./waterSys_functions/putWaterSystem');

const router = express.Router();

router.delete('/water-systems/:water_systems_id', authorize, deleteWaterSystem);
router.get('/water-systems/:water_systems_id', authorize, getWaterSystem);
router.post('/water-systems', authorize, postWaterSystem);
router.put('/water-systems/:water_systems_id', authorize, putWaterSystem);

module.exports = router;
