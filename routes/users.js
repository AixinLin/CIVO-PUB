var express = require('express');
var router = express.Router();
var path = require('path');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('executive', {"title": ""});
});

router.get('/:id', function(req, res, next) {
  
  res.render('executive', {"title": "Executive Page"});
  
});

module.exports = router;
