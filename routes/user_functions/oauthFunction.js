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
      let water_systems_id = result.water_systems_id || null;
      let profileStepCompleted = result.profileStepCompleted;
      res.redirect(`https://levelwaterio.herokuapp.com/?t=${token}&psc=${profileStepCompleted}&wsi=${water_systems_id}&ft=f`);
      // res.status(200).json(result);
      res.end();
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
          const claim = { userId: userId };
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '7 days',
          });
          res.set({
            'Content-Type': 'text/plain',
            'Token': `${token}`
          });
          res.redirect(`https://levelwaterio.herokuapp.com/?t=${token}&psc=none&wsi=null&ft=t`)
          // res.status(200).json({ userId, token });
          res.end();
        });
      });
    }
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = oAuthUser;
