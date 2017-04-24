const express = require('express');
const router = express.Router();

const test = require('./users');
const usersSignup = require('./users_signup');

router.get('/users', test);
router.post('/users', usersSignup);
// router.get('/api/puppies/:id', queries.getSinglePuppy);
// router.post('/api/puppies', queries.createPuppy);
// router.put('/api/puppies/:id', queries.updatePuppy);
// router.delete('/api/puppies/:id', queries.removePuppy);


module.exports = router;
