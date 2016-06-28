// Require resource's model(s).
var User = require("../models/user");

var edit = function(req, res, next){
  res.render('users/edit', {user: req.user});
};




module.exports = {
  edit: edit
};

