var express = require('express');
var router = express.Router();
var path = require('path');
var courseModel = require('../model/course')
var userModel = require('../model/user')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin
const stringifyObject = require('stringify-object');

// router.get('/', function(req, res, next) {
//   res.render(path.join(__dirname, '../public', 'course.html'), {title:"abcdefg"})
// });

router.get('/edit',function(req, res, next) {
  res.render("forms", {"title":"courseEdit"});
});

//add course
router.post('/add', function(req, res, next) {
  //get course name and time
  var courseName = req.fields.courseName;
  var courseTime = req.fields.courseTime;

  //find course based on the course and time
  courseModel.findCourseByName(courseName).then(function(course,err){
    if(err) {console.log(err)}
    //update the number of people
    //var userId = req.session.user._id;
    console.log(course);
    var newCourse = {
      _id: course._id,
      name: course.name,
      location: course.location,
      attendee: course.attendee,
      date: course.date
    }
    course = newCourse;
    
    //console.log(course);
    //add course to the current user with course and current user id
    userId = "5d6acc7d2d58c30ec9bf9a34";
    userModel.addCourse(course,userId).then(function(user,err){
      if(err) {console.log(err);}
      console.log(user);
      //update course object as well
      courseModel.updateAttendee(course._id, user).then(function(doc, err){
        if(err) {console.log(err);}
        courseModel.updateNumOfPeople(course._id, userId);
        //userModel.updateNumOfPeople(userId,course._id);
        res.redirect("/courses/schedule");
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
  var userId = "5d6acc7d2d58c30ec9bf9a34";

  //find the current user and get the info and pass the user info in schedule
  
  userModel.getNumOfPeople(userId).then((result,err)=>{
    var newUser =  [];
    result.forEach(function(obj){
      var eachCourse = obj.coursesObjects[0];
      eachCourse.date.forEach(date => {  
        newUser.push({
          "id": eachCourse._id,
          "title": eachCourse.name + "\n" + "People: " + eachCourse.num_of_people,
          "startTime": date.start_time.getHours() + ":" + date.start_time.getMinutes(),
          "endTime":date.end_time.getHours() + ":" + date.end_time.getMinutes(),
          startRecur: date.start_time,
          daysOfWeek:[date.start_time.getDay()]
        });
      });
    });
    //console.log(newUser);
    res.render("schedule", {"users": JSON.stringify(newUser)});   
  });
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
