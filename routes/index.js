var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET facebook page. */
router.get('/facebook', function(req, res, next) {
  res.render('facebook', { title: 'Express' });
});


/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});




module.exports = router;
