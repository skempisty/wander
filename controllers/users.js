// Require resource's model(s).
var User = require("../models/user");

var edit = function(req, res, next){
  res.render('users/edit', {user: req.user});
};


var trips = function(req, res, next) {
  res.render('users/trips', {user: req.user});
};



// var update = function(req, res, next){
//   User.findById(req.params.id, function(err, user){
//     if(err){
//       res.json({message: 'Could not find user because ' + err});
//     } else if (!user){
//       res.json({message: 'No user with this id.'});
//     } else {
//       user.name = req.body.name;
//       user.handle = req.body.handle;

//       user.save(function(err, user){
//         res.json(user);
//       });
//       res.render('users/edit', {user: user});
//     }
//   });
// };

// function destroy(req, res, next){
//   User.
// }



module.exports = {
  edit: edit,
  trips: trips
};

