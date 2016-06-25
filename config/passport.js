var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function(accessToken, refreshToken, profile, cb){
    console.log(profile);
    User.findOne({providerID: profile.id}, function(err, user){
      if(err) {return cb(err)};
      if(user) {return cb(null, user)};
      var newUser = new User({
        name: profile.displayName,
        providerId: profile.id
      });
      newUser.save(function(err){
        if(err) {return cb(err) };
        return cb(null, newUser);
      });
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

