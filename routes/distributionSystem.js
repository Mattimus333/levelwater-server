const authorize = require('./authorize');
const express = require('express');
const getdistributionSystem = require('./distributionSystem_functions/getDistributionSystem');
// const deletedistributionSystem = require('./distributionSystem_functions/deletedistributionSystem');
// const postdistributionSystem = require('./distributionSystem_functions/postdistributionSystem');
// const patchdistributionSystem = require('./distributionSystem_functions/patchdistributionSystem');

const router = express.Router();

router.get('/distributionSystem/:water_systems_id', authorize, getdistributionSystem);
// router.patch('/distributionSystem/:distribution_systems_id', authorize, patchdistributionSystem);
// router.post('/distributionSystem', authorize, postdistributionSystem);
// router.delete('/distributionSystem/:distribution_systems_id', authorize, deletedistributionSystem);

module.exports = router;
