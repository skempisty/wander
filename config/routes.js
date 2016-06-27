var express = require('express'),
    router  = new express.Router();
    passport = require('passport'),
    logout = require('express-passport-logout');

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');

// root path:
router.get('/', pagesController.feed);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);
// Google OAuth
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


// router.get('/logout', logout());

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
  return res.status(200).send();
});

// contact page
router.get('/contact', pagesController.contact);

// about page
router.get('/about', pagesController.about);



module.exports = router;
