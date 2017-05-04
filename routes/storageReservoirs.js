const authorize = require('./authorize');
const express = require('express');
const getStorageReservoirs = require('./storageReservoir_functions/getStorageReservoirs');
const deleteStorageReservoirs = require('./storageReservoir_functions/deleteStorageReservoirs');
const postStorageReservoirs = require('./storageReservoir_functions/postStorageReservoirs');
const patchStorageReservoirs = require('./storageReservoir_functions/patchStorageReservoirs');

const router = express.Router();

router.delete('/storage-reservoirs/:storage_reservoir_id', authorize, deleteStorageReservoirs);
router.get('/storage-reservoirs/:water_systems_id', authorize, getStorageReservoirs);
router.patch('/storage-reservoirs/:storage_reservoir_id', authorize, patchStorageReservoirs);
router.post('/storage-reservoirs', authorize, postStorageReservoirs);

module.exports = router;
