const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./newAuthFile');

module.exports = (passport) => {
  passport.use(new GoogleStrategy(
    {
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
    },
    (token, accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        console.log(profile);
        const user = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
        }
        done(null, user);
      });
    }
  ));
};
