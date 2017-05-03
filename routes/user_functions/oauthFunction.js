const knex = require('../../knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');

const oAuthUser = (req, res) => {
  let result;
  knex('users')
  .where('email', req.session.passport.user.email)
  .then((results) => {
    if (results.length > 0){
      result = results[0];
      const claim = { userId: result.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days',
      });
      delete result.hashed_password;
      result.token = token;
      res.status(200).json(result);
    } else {
      const password = req.session.passport.user.first_name + 99999999
      const user = req.session.passport.user;
      bcrypt.hash(password, 12)
      .then((hashed_password) => {
        user.hashed_password = hashed_password;
        knex('users')
        .insert(user, '*')
        .then((userResult) => {
          const userId = userResult[0];
          const claim = { userId: user };
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '7 days',
          });
          res.status(200).json({ userId, token });
        });
      });
    }
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = oAuthUser;
