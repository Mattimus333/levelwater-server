const authorize = require('./authorize');
const express = require('express');
const getRatesFinances = require('./ratesFinances_functions/getRatesFinances');
const deleteRatesFinances = require('./ratesFinances_functions/deleteRatesFinances');
const postRatesFinances = require('./ratesFinances_functions/postRatesFinances');
const patchRatesFinances = require('./ratesFinances_functions/patchRatesFinances');

const router = express.Router();

router.get('/ratesFinances/:water_systems_id', authorize, getRatesFinances);
router.delete('/ratesFinances/:ratesFinancesId', authorize, deleteRatesFinances);
router.post('/ratesFinances', authorize, postRatesFinances);
router.patch('/ratesFinances/:ratesFinancesId', authorize, patchRatesFinances);

module.exports = router;
