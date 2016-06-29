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


// root path:
router.get('/', pagesController.feed);

// users resource paths:
router.get('/users/:id/edit', usersController.bio);
router.get('/trips', usersController.trips);
router.put('/users', usersController.update);


// Flickr OAuth
router.get('/auth/flickr',
  passport.authenticate('flickr'),
  function(req, res){

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
