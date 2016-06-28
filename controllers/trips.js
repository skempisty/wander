var Trip = require("../models/trip");
var request = require('request');

var index = function(req, res, next) {


  request(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&format=json&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${req.user.flickrId}`
          , function(error, response, body) {
      var parsed = JSON.parse(body);
      console.log(parsed);

  });

  res.render('trips/index', {user: req.user});
};



module.exports = {
  index: index
};
