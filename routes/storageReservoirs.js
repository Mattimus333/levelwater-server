const authorize = require('./authorize');
const express = require('express');
const getStorageReservoirs = require('./storageReservoir_functions/getStorageReservoirs');
const deleteStorageReservoirs = require('./storageReservoir_functions/deleteStorageReservoirs');

const router = express.Router();

router.get('/storage-reservoirs/:water_systems_id', authorize, getStorageReservoirs);
// router.patch('/storageReservoirs/:storageReservoir_id', authorize, patchStorageReservoirs);
// router.post('/storageReservoirs', authorize, postStorageReservoirs);
router.delete('/storage-reservoirs/:reservoir_id', authorize, deleteStorageReservoirs);

module.exports = router;
