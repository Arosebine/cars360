const express = require('express');
const  upload  = require('../utils/multer');
const { carRegistration, findAll } = require('../controller/car.controller');
const { paystackIniate, paystackVerify } = require('../controller/paystack.controller');
const router = express.Router();
const passport = require('passport');
const { flwtransact, payCallback } = require('../controller/flutterwave.controler');
const { carCreate } = require('../controller/user.controller');








/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/flutter', flwtransact );
router.get('/payment-callback',  payCallback );

router.post('/create', carRegistration);

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'profile',
  }));



router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});



router.get('/cars', findAll);
router.post('/paystack/initiate', paystackIniate);
router.get('/paystack/verify', paystackVerify);
router.post('/car', upload.array('files', 4 ), carCreate);





module.exports = router;
