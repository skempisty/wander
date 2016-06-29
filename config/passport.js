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
     // getBuddyIcon(newUser, profile).then(function(newUser) {
       newUser.save(function(err) {
         if (err) {return cb(err)};
         return cb(null, newUser);
       });
     // });
   });
 }
));

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
