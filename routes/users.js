const express = require('express');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const configAuth = require('../config/auth');
const test = require('./user_functions/test');
const postUser = require('./user_functions/postUser');
const getUser = require('./user_functions/getUser');
const putUser = require('./user_functions/putUser');
const deleteUser = require('./user_functions/deleteUser');
const loginUser = require('./user_functions/loginUser');
const logoutUser = require('./user_functions/logoutUser');
const oAuthUser = require('./user_functions/oauthFunction');
const authorize = require('./authorize');

const router = express.Router();
require('../config/passport')(passport);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});


router.post('/login', loginUser);
router.delete('/logout', logoutUser);
router.delete('/users/:user_id', authorize, deleteUser);
router.get('/users/:user_id', authorize, getUser);
router.post('/users', postUser);
router.put('/users/:user_id', authorize, putUser);
router.get('/test', test);

router.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ] }
));

router.get('/auth/callback', passport.authenticate('google'), oAuthUser);


module.exports = router;
