var express = require('express');
var router = express.Router();
var path = require('path');
var courseModel = require('../model/course')
var userModel = require('../model/user')
const stringifyObject = require('stringify-object');

// router.get('/', function(req, res, next) {
//   res.render(path.join(__dirname, '../public', 'course.html'), {title:"abcdefg"})
// });

router.get('/edit', function(req, res, next) {
  res.render("forms", {"title":"courseEdit"});
});

//add course
router.post('/add', function(req, res, next) {
  //get course name and time
  var courseName = req.fields.courseName;
  var courseTime = req.fields.courseTime;

  // let course = {
  //   name: "database",
  //   num_of_people:0,
  //   start_time: new Date('2019-08-08T03:24:00'),
  //   end_time: new Date('2019-08-09T03:24:00'),
  // } 

  // let user = {
  //   first_name: "Yijun",
  //   last_name: "He",
  // }

  //find course based on the course and time
  courseModel.findCourseByNameTime(courseName).then(function(course,err){
    if(err) {console.log(err)}

    //update the number of people
    course[0].num_of_people = course[0].num_of_people + 1;
    var userId = "5d4f0dbbcd9784e0d4613e1a";
    
    //add course to the current user with course and current user id
    var newCourse = course[0];
    userModel.addCourse(newCourse,userId).then(function(user,err){
      if(err) {console.log(err);}
      console.log(user);
      
      //update course object as well
      var courseId = newCourse._id;
      courseModel.updateAttendee(courseId, user).then(function(doc, err){
        if(err) {console.log(err);}
        console.log(doc);
      });
    }); 
  })
})

//get add course page
router.get('/add', function(req, res, next) {
  //get all courses
  courseModel.getAllCourses().then(function(result,err){
    if(err) {}
    var resultStr = JSON.stringify(result);
    //console.log(JSON.parse(JSON.stringify(result)) );
    res.render("addCourse", {"courses":result, "coursesString":resultStr});
  });
});

router.get('/test', function(req, res, next) {
  res.render("test");
});

//course schedule page
router.get('/schedule', function(req, res, next) {
  //get current user here
  var userId = "5d4f0dbbcd9784e0d4613e1a";

  //find the current user and get the info and pass the user info in schedule
  userModel.findUserById(userId).then(function(user,err){
    if(err){}
    var newUser = user[0].courses.map(function(obj){
      return {
        "id": obj._id,
        "title": obj.name + "\n" + "People: " + obj.num_of_people,
       //"num_of_people":  obj.num_of_people,
        "start":   obj.start_time,
        "end":  obj.end_time,
      }
    });
    res.render("schedule", {"users": JSON.stringify(newUser)});
  })
});

router.get('/', function(req, res, next) {
  res.render("test",{"title":"Course"});
});

router.get('/:id', function(req, res, next) {
  var courseId = req.params.id;
  courseModel.findCourseById(courseId).then(function(course,err){
    if(err){}
    console.log(course[0]);
    res.render("courseDetail", {"course": course[0]});
  })
  
});




module.exports = router;
