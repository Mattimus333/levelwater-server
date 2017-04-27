const authorize = require('./authorize');
const express = require('express');

const router = express.Router();

router.get('/storageReservoirs/:water_systems_id', authorize, getStorageReservoirs);
router.patch('/storageReservoirs/:source_id', authorize, patchStorageReservoirs);
router.post('/storageReservoirs', authorize, postStorageReservoirs);
router.delete('/storageReservoirs/:source_id', authorize, deleteStorageReservoirs);

module.exports = router;
