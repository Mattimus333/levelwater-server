const authorize = require('./authorize');
const express = require('express');
const getDistributionSystem = require('./distributionSystem_functions/getDistributionSystem');
const deleteDistributionSystem = require('./distributionSystem_functions/deleteDistributionSystem');
const postDistributionSystem = require('./distributionSystem_functions/postDistributionSystem');
const patchDistributionSystem = require('./distributionSystem_functions/patchDistributionSystem');

const router = express.Router();

router.get('/distributionSystem/:water_systems_id', authorize, getDistributionSystem);
router.patch('/distributionSystem/:distribution_system_id', authorize, patchDistributionSystem);
router.post('/distributionSystem', authorize, postDistributionSystem);
router.delete('/distributionSystem/:distribution_system_id', authorize, deleteDistributionSystem);

module.exports = router;
