const express = require('express');
const test = require('./user_functions/test');
const postUser = require('./user_functions/postUser');
const getUser = require('./user_functions/getUser');
const putUser = require('./user_functions/putUser');
const deleteUser = require('./user_functions/deleteUser');
const loginUser = require('./user_functions/loginUser');
const logoutUser = require('./user_functions/logoutUser');
const authorize = require('./authorize');

const router = express.Router();

router.get('/test', authorize, test);
router.post('/users', postUser);
router.get('/users/:userId', authorize, getUser);
router.put('/users/:userId', authorize, putUser);
router.delete('/users/:userId', authorize, deleteUser);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);
// router.get('/water_systems', )

module.exports = router;
