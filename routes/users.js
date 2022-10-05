const express = require('express');
const  passport  = require('passport');
const  upload  = require('../utils/multer');
const { create } = require('../controller/car.controller');
const router = express.Router();









/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/create', upload.array('file', 4), create)

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['profile'],
  })
);

router.get(
  '/auth/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res) => {
    res.send('you have reached the callback uri');
  }
);




module.exports = router;
