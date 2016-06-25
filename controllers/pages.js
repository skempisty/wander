var feed = function(req, res, next) {
  res.render('pages/feed');
};

module.exports = {
  welcome: feed
};
