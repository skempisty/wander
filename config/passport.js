var passport       = require('passport');
var User           = require('../models/user');
var FlickrStrategy = require('passport-flickr').Strategy;
var request        = require('request');

passport.use(new FlickrStrategy({
   consumerKey: process.env.FLICKR_CONSUMER_KEY,
   consumerSecret: process.env.FLICKR_CONSUMER_SECRET,
   callbackURL: process.env.CALLBACK_URL
 },
 // FIND USER IF EXISTS, IF DOESNT EXIST CREATE USER
 function(accessToken, refreshToken, profile, cb) {
   User.findOne({ flickrId: profile.id }, function(err, user) {
     if (err) {return cb(err)};
     if (user) {return cb(null, user)};
     var newUser = new User({
       handle: profile.displayName,
       flickrId: profile.id,
       name: profile.fullName
     });
     getBuddyIcon(newUser, profile).then(function(newUser) {
       newUser.save(function(err) {
         if (err) {return cb(err)};
         return cb(null, newUser);
       });
     });
   });
 }
));



function getBuddyIcon(newUser, profile){
  return new Promise(function(resolve, reject) {

console.log(profile)
    var url = `https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${profile.id}&format=json`;
console.log('url', url);
    request(url, function(err, res, body){
      var trimmedBody = body.replace('jsonFlickrApi(', '').slice(0, -1);
      trimmedBody = JSON.parse(trimmedBody).person;
      var photoUrl = `https://farm${trimmedBody.iconfarm}.staticflickr.com/${trimmedBody.iconserver}/buddyicons/${trimmedBody.nsid}.jpg`;
      newUser.flickrPhotoUrl = photoUrl;
      resolve(newUser);
    });
  });
};


// configure serializeUser
passport.serializeUser(function(user, done) {
 done(null, user.id);
});

// configure deserializeUser
passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user) {
   done(err, user);
 });
});
