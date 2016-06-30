var User = require("../models/user");
var request = require('request');

var feed = function(req, res, next) {
  res.render('pages/feed', {user: req.user});
};

var contact = function(req, res, next){
  res.render('pages/contact', {user: req.user});
};

var about = function(req, res, next){
  res.render('pages/about', {user: req.user});
};

module.exports = {
  feed: feed,
  contact: contact,
  about: about
};


