var express = require('express'),
    router  = new express.Router();
    passport = require('passport');

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var tripsController = require('../controllers/trips');



// root path:
router.get('/', pagesController.feed);

// users resource paths:
router.get('/users/:id/edit', usersController.edit);

// trips paths
router.get('/trips/albumSelect', tripsController.albumSelect);
router.get('/trips/new', tripsController.new);
router.post('/trips', tripsController.create);

// Flickr OAuth
router.get('/auth/flickr',
  passport.authenticate('flickr'),
   function(req, res){
    // The request will be redirected to Flickr for authentication, so this
    // function will not be called.
});

router.get('/auth/callback',
  passport.authenticate('flickr', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


// router.get('/logout', logout());

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// contact page
router.get('/contact', pagesController.contact);

// about page
router.get('/about', pagesController.about);



module.exports = router;
