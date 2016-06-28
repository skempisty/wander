// Require resource's model(s).
var User = require("../models/user");

var edit = function(req, res, next){
  res.render('users/edit', {user: req.user});
};


var trips = function(req, res, next) {
  res.render('users/trips', {user: req.user});
};

function create(req, res, next) {
  // Add current user's id to the sent data…
  var user = _.merge(req.body, {user: req.user._id});
  User.create(user, function(err, user) {
    res.json(user);
  });
};

function update(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err){
      res.json({message: 'Could not find user because ' + err});
    } else if(!user){
      res.json({message: 'No user with this id'});
    } else {
      user.handle = req.body.handle;
      user.file = req.body.file;

      user.save(function(err, user){
        res.json(user);
      });
      res.render('pages/feed', {user: req.user});
    }
  });
};



module.exports = {
  edit: edit,
  trips: trips,
  create: create,
  update: update
};

