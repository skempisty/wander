var express = require('express');
var router  = new express.Router();
var passport = require('passport');


// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');


// root path:
router.get('/', pagesController.feed);

router.get('/', function(req, res, next){
  res.render('feed', { user: req.user });
});

router.get('/login', passport.authenticate('google', { scope: ['profile']}));

router.get('/auth/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res){
    res.redirect('/')
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// users resource paths:
router.get('/users',     usersController.index);

router.get('/users/:id', usersController.show);


module.exports = router;
