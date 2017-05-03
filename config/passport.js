const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');

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
        // let newUser;
        // const password = profile.name.givenName + 1234;
        // return bcrypt.hash(password, 12)
        // .then((hashed_password) => {
        //   newUser.hashed_password = hashed_password;
        //   return knex('users')
        //   .where('email', profile.emails[0].value)
        // })
        // .then((response) => {
        //   if (response.length === 0) {
        //     newUser.email = profile.emails[0].value;
        //     newUser.first_name = profile.name.givenName;
        //     newUser.last_name = profile.name.familyName;
        //     newUser.superuser = 'true';
        //     return knex('users').insert(newUser, '*')
        //   } else {
        //     return knex('users')
        //     .where('email', profile.emails[0].value)
        //   }
        // })
        // .then((users) => {
        //   const user = users[0];
        //   const claim = { userId: user };
        //   const token = jwt.sign(claim, process.env.JWT_KEY, {
        //     expiresIn: '7 days',
        //   });
        //   res.status(200).json({ user, token });
        // })
        // .catch((err) => {
        //   res.send({ status: 400, ErrorMessage: err });
        // });

        // })
        done(null, user);
      });
    }
  ));
};
