module.exports = {
  'googleAuth' : {
    'clientID': process.env.CLIENTID,
    'clientSecret': process.env.CLIENTSECRET,
    'callbackURL': 'https://levelwater-server.herokuapp.com/auth/callback',
  }
}
