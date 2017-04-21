'use strict';

// refactor to es6
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send('drunk with POWER');
});

module.exports = router;
