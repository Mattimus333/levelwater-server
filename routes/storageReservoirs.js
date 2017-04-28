const authorize = require('./authorize');
const express = require('express');
const getStorageReservoirs = require('./storageReservoir_functions/getStorageReservoirs');
const deleteStorageReservoirs = require('./storageReservoir_functions/deleteStorageReservoirs');
const postStorageReservoirs = require('./storageReservoir_functions/postStorageReservoirs');
const patchStorageReservoirs = require('./storageReservoir_functions/patchStorageReservoirs');

const router = express.Router();

router.get('/storageReservoirs/:water_systems_id', authorize, getStorageReservoirs);
router.patch('/storageReservoirs/:storage_reservoirs_id', authorize, patchStorageReservoirs);
router.post('/storageReservoirs', authorize, postStorageReservoirs);
router.delete('/storageReservoirs/:storage_reservoirs_id', authorize, deleteStorageReservoirs);

module.exports = router;
