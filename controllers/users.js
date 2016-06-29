// Require resource's model(s).
var User = require("../models/user");

var bio = function(req, res, next){
  res.render('users/bio', {user: req.user});
};

var trips = function(req, res, next) {
  res.render('users/trips', {user: req.user});
};

function update(req, res, next){
  req.user.bio = req.body.bio;
  req.user.save(function(err, user){
    res.render('pages/feed', {user: req.user});
  });
};

module.exports = {
  bio: bio,
  trips: trips,
  update: update
};

