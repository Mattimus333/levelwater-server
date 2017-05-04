const test = (req, res, next) => {
  res.redirect('http://google.com');
  res.end();
};

module.exports = test;
