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

router.post('/login', loginUser);
router.delete('/logout', logoutUser);
router.delete('/users/:user_id', authorize, deleteUser);
router.get('/users/:user_id', authorize, getUser);
router.post('/users', postUser);
router.put('/users/:user_id', authorize, putUser);

module.exports = router;
