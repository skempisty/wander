var Trip = require("../models/trip");
var request = require('request');

var baseSetUrl = 'https://api.flickr.com/services/rest/?method=flickr';

var albumSelect = function(req, res, next) {

  var commonArgsUrl = `&format=json&nojsoncallback=?&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${req.user.flickrId}`;
  var albums = [];

  request(baseSetUrl + '.photosets.getList' + commonArgsUrl + `&primary_photo_extras=url_s`, function(error, response, body) {
    var parsed = JSON.parse(body);
    console.log(parsed.photosets.photoset);

    for(var i=0; i < parsed.photosets.photoset.length; i++) {
    albums.push(parsed.photosets.photoset[i]);
    }
    res.render('trips/albumSelect', {user: req.user, albums: albums});
  });
};

var newTrip = function(req, res, next) {
  var albumId = req.query.album_id;
  res.render('trips/new', {user: req.user, albumId: albumId});
};

var create = function(req, res, next) {
  var commonArgsUrl = `&format=json&nojsoncallback=?&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${req.user.flickrId}`;
  var title = req.body.title;
  var descrip = req.body.description;
  var albumId = req.body.albumId;
  var photoIds = [];
  var geoTags = [];

  // REQUEST to get photo Ids and GEOTAGS from selected album
  request(baseSetUrl + '.photosets.getPhotos' + commonArgsUrl + `&photoset_id=${albumId}&extras=geo`, function(error, response, body) {
    var parsed = JSON.parse(body);
    console.log(parsed);
    console.log(parsed.photoset.photo[0]);

    for(var i=0; i<parsed.photoset.photo.length; i++) {
      photoIds.push(parsed.photoset.photo[i].id);
      geoTags.push([parsed.photoset.photo[i].latitude, parsed.photoset.photo[i].longitude]);
    }
    console.log(geoTags);

    // res.render('trips/albumSelect', {user: req.user, albums: albums});
  });
  Trip.create({
    title: title,
    description: descrip,
    albumId: albumId,
    createdOn: Date.now(),
    creator: req.user.id,
    // mainPhoto: // photo,
    locData: geoTags
  }, function(err, trip) {
    res.redirect('/')
  });
};

var show = function() {

};

module.exports = {
  albumSelect: albumSelect,
  new: newTrip,
  create: create,
  show: show
};
    // }
    // console.log('albums' + albums);
    // setIds.forEach(function(setId) {
    //   promises.push(new Promise(function(resolve, reject) {
    //     var url = baseSetUrl + '.photosets.getPhotos' + commonArgsUrl + `&photoset_id=${setId}`;
    //     request(url, function(error, response, body) {
    //       resolve(JSON.parse(body));
    //     });
    //   }));
    // });
    // Promise.all(promises).then(function(results) {
