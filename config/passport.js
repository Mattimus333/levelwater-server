const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');

module.exports = (passport) => {
  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });
  //
  // // used to deserialize the user
  // passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => {
  //     done(err, user);
  //   });
  // });

  passport.use(new GoogleStrategy({

    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,

  }, (token, refreshToken, profile, done) => {
    console.log('I got here!');
    console.log(profile);
    console.log(token);
    process.nextTick(() => {
      return done(null, profile);
    })
  }

  ));
}
