// Require resource's model(s).
var User = require("../models/user");

var bio = function(req, res, next){
  res.render('users/bio', {user: req.user, page: 'bio', apikey: process.env.GOOGLE_KEY});

};

var trips = function(req, res, next) {
  res.render('users/trips', {user: req.user, apikey: process.env.GOOGLE_KEY});
};

function update(req, res, next) {
  req.user.bio = req.body.bio;
  req.user.save(function(err, user){
    res.redirect('/trips');

  });
};



module.exports = {
  bio: bio,
  trips: trips,
  update: update
};

