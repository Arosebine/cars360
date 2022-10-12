const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/usermongo.model');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET facebook page. */
router.get('/facebook', function(req, res, next) {
  res.render('facebook', { title: 'Express' });
});



/* GET profile page. */
router.get('/registration', function(req, res, next) {
  res.render('registration', { user: req.user } );
});



/* GET profile page. */
router.get('/paystack', function(req, res, next) {
  res.render('paystack', { user: req.user } );
});

router.get('/flutterwave', function(req, res, next) {
  res.render('flutterwave', {} );
});


router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    res.render('profile');
  }
);

/* GET profile page. */
router.get('/profile', function(req, res, next){
const userId = User.find({})
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(1)
      .exec((err, result)=>{
  if(result)

    res.render('profile', { data: result  } );
  })
});




module.exports = router;
