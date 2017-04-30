const authorize = require('./authorize');
const express = require('express');
const getRatesFinances = require('./ratesFinances_functions/getRatesFinances');
const deleteRatesFinances = require('./ratesFinances_functions/deleteRatesFinances');
const postRatesFinances = require('./ratesFinances_functions/postRatesFinances');
const patchRatesFinances = require('./ratesFinances_functions/patchRatesFinances');

const router = express.Router();

router.get('/rates-finances-fixedcosts/:water_systems_id', authorize, getRatesFinances);
router.delete('/rates-finances-fixedcosts/:rates_finances_id', authorize, deleteRatesFinances);
router.post('/rates-finances-fixedcosts', authorize, postRatesFinances);
router.patch('/rates-finances-fixedcosts/:rates_finances_id', authorize, patchRatesFinances);

module.exports = router;
