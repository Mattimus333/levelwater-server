const authorize = require('./authorize');
const express = require('express');
const getDashboard = require('./dashboard_functions/getDashboard');
// const postDashboard = require('./dashboard_functions/postDashboard');
// const patchDashboard = require('./dashboard_functions/patchDashboard');

const router = express.Router();

router.get('/dashboard/:water_systems_id', authorize, getDashboard);
// router.patch('/dashboard/:water_systems_id', authorize, patchDashboard);
// router.post('/dashboard', authorize, postDashboard);

module.exports = router;
