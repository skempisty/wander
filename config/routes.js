var express = require('express'),
    router  = new express.Router(),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    connect = require('connect');
    methodOverride = require('method-override');



// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var tripsController = require('../controllers/trips');


// root path:
router.get('/', pagesController.feed);

// users resource paths:
<<<<<<< HEAD
router.get('/users/:id/edit', usersController.edit);

// trips paths
router.get('/trips/new', tripsController.new);
=======
router.get('/users/:id/edit', usersController.bio);
router.get('/trips', usersController.trips);
router.put('/users', usersController.update);

>>>>>>> bc3ee683e600efe91fbc1ebd7977a4a8321eca83

// Flickr OAuth
router.get('/auth/flickr',
  passport.authenticate('flickr'),
<<<<<<< HEAD
   function(req, res){
    // The request will be redirected to Flickr for authentication, so this
    // function will not be called.
});
=======
  function(req, res){

  });
>>>>>>> bc3ee683e600efe91fbc1ebd7977a4a8321eca83

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



// upload images
router.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
    // ...
});

router.get('/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
});


module.exports = router;
