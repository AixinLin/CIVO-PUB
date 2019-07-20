var express = require('express');
var router = express.Router();
var path = require('path');
var courseModel = require('../model/course')

router.get('/', function(req, res, next) {
  res.render(path.join(__dirname, '../public', 'course.html'), {title:"abcdefg"})
});

router.get('/edit', function(req, res, next) {
  res.render("forms", {"title":"courseEdit"});
});

router.post('/add', function(req, res, next) {
  var courseName = req.fields.courseName;
  let course = {
    name: courseName,
  } 
  courseModel.create(course).then(function(result){
    console.log(result);
    res.redirect('/course');
  });

})

router.get('/add', function(req, res, next) {
  res.render("courseEdit", {"title":"courseAdd"});
});



module.exports = router;
