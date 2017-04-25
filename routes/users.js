const express = require('express');
const test = require('./user_functions/test');
const postUser = require('./user_functions/postUser');
const getUser = require('./user_functions/getUser');
const deleteUser = require('./user_functions/deleteUser');
const authorize = require('./authorize');

const router = express.Router();

router.get('/test', authorize, test);
router.get('/users/:userId', authorize, getUser);
router.post('/users', postUser);
router.delete('/users/:userId', authorize, deleteUser);
// router.get('/water_systems', )

module.exports = router;
