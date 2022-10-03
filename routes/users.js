const express = require('express');
const { upload } = require('../utils/multer');
const { create } = require('../controller/car.controller');
const router = express.Router();






/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/create', upload.array('photo', 4), create)

module.exports = router;
