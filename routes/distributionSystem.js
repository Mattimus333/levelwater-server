const authorize = require('./authorize');
const express = require('express');
const getDistributionSystem = require('./distributionSystem_functions/getDistributionSystem');
const deleteDistributionSystem = require('./distributionSystem_functions/deleteDistributionSystem');
const postDistributionSystem = require('./distributionSystem_functions/postDistributionSystem');
const patchDistributionSystem = require('./distributionSystem_functions/patchDistributionSystem');

const router = express.Router();

/** CRUD Routes for Distribution Systems table*/
router.get('/distribution-system/:water_systems_id', authorize, getDistributionSystem);
router.patch('/distribution-system/:distribution_system_id', authorize, patchDistributionSystem);
router.post('/distribution-system', authorize, postDistributionSystem);
router.delete('/distribution-system/:distribution_system_id', authorize, deleteDistributionSystem);

module.exports = router;
