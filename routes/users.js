var express = require('express');
const passport = require('passport');
const User = require('../models/user');
var router = express.Router();
const authenticate = require('../authenticate');

/* GET users listing. */
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  // Ensure that the request is from an admin user
  if (req.user && req.user.admin) {
    // If the user is an admin, return details of all existing user documents
    User.find()
      .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
      })
      .catch((err) => next(err));
  } else {
    // If the user is not an admin, return an error
    const err = new Error('You are not authorized to access this resource!, only admin');
    err.status = 403;
    return next(err);
  }
});

router.post('/signup', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration Successful!' });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'Congratulations, You are successfully logged in!' });
});

module.exports = router;
