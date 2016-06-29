var User = require("../models/user");
var request = require('request');

var feed = function(req, res, next) {
  res.render('pages/feed', {user: req.user});
};

var contact = function(req, res, next){
  // request("https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=5911dd2be24488cfd9d364cd6413126b&user_id=" + req.user.flickrId + "&format=json",
  //   function(err, res, body){
  //     var trimmedBody = body.replace('jsonFlickrApi(', '').slice(0, -1);
  //     trimmedBody = JSON.parse(trimmedBody).person;
  //     var photoUrl = `https://farm${trimmedBody.iconfarm}.staticflickr.com/${trimmedBody.iconserver}/buddyicons/${trimmedBody.nsid}.jpg`;
  //     console.log(photoUrl);
  // });

  res.render('pages/contact', {user: req.user});
};

var about = function(req, res, next){
// request("https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=5911dd2be24488cfd9d364cd6413126b&user_id=" + req.user.flickrId + "&format=json",
//     function(err, res, body){
//       var trimmedBody = body.replace('jsonFlickrApi(', '').slice(0, -1);
//       trimmedBody = JSON.parse(trimmedBody).person;
//       var photoUrl = `https://farm${trimmedBody.iconfarm}.staticflickr.com/${trimmedBody.iconserver}/buddyicons/${trimmedBody.nsid}.jpg`;
//       console.log(photoUrl);
  // });

  res.render('pages/about', {user: req.user});
};

module.exports = {
  feed: feed,
  contact: contact,
  about: about
};


