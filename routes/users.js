var express = require('express');
const passport = require('passport');
const User = require('../models/user');
var router = express.Router();
const authenticate = require('../authenticate');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users', { title: 'Users' });
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
