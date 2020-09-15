var express = require('express');
var router = express.Router();
const ModelMovie = require('../models/movie')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '', userName : ''});
});

module.exports = router;
