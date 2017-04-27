const authorize = require('./authorize');
const express = require('express');

const router = express.Router();

router.get('/storageReservoirs/:water_systems_id', authorize, storageReservoirs);
router.patch('/storageReservoirs/:source_id', authorize, storageReservoirs);
router.post('/storageReservoirs', authorize, storageReservoirs);
router.delete('/storageReservoirs/:source_id', authorize, storageReservoirs);

module.exports = router;
