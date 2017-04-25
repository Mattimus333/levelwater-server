const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.send('user logged out');
};

module.exports = logoutUser;
