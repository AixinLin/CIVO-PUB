var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
  res.render(path.join(__dirname, '../public', 'course.html'), {title:"abcdefg"})
});

router.get('/edit', function(req, res, next) {
  res.render("courseEdit", {"title":"courseEdit"});
});

router.get('/add', function(req, res, next) {
  res.render("courseEdit", {"title":"courseAdd"});
});



module.exports = router;
