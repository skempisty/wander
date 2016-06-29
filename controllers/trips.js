// var Trip = require("../models/trip");
// var request = require('request');

// var newTrip = function(req, res, next) {

//   var albums = [];
//   var baseSetUrl = 'https://api.flickr.com/services/rest/?method=flickr';
//   var commonArgsUrl = `&format=json&nojsoncallback=?&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${req.user.flickrId}`;

//   request(baseSetUrl + '.photosets.getList' + commonArgsUrl, function(error, response, body) {

//     var parsed = JSON.parse(body);

//     for(var i=0; i < parsed.photosets.photoset.length; i++) {
//     albums.push(parsed.photosets.photoset[i]);
//     }
//     console.log(albums);
//     // }
//     // console.log('albums' + albums);
//     // setIds.forEach(function(setId) {
//     //   promises.push(new Promise(function(resolve, reject) {
//     //     var url = baseSetUrl + '.photosets.getPhotos' + commonArgsUrl + `&photoset_id=${setId}`;
//     //     request(url, function(error, response, body) {
//     //       resolve(JSON.parse(body));
//     //     });
//     //   }));
//     // });
//     // Promise.all(promises).then(function(results) {

//     res.render('trips/new', {user: req.user, albums: albums});
//   });
//   // });
// };

// module.exports = {
//   new: newTrip
// };
