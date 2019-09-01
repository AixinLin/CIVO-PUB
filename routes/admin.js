var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
var eventModel = require('../model/event');
var courseModel = require('../model/course');


// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render("admin");
});

router.get('/addCourse', function(req, res, next) {
    res.render("adminAddCourse");
});

router.post('/addCourse', function(req, res, next) {
    var name = req.fields.name;
    var location = req.fields.location;
    var start_time = req.fields.start_time;
    var end_time = req.fields.end_time;
    var date = {
        start_time: start_time,
        end_time: end_time
    }
    var newCourse = {
        name: name,
        location: location,
        date: date,
        num_of_people: 0,
    }
    courseModel.findCourseByName(name).then((course,err) => {
        if(course === null){
            courseModel.create(newCourse).then((cour,err) => {
                console.log(cour)
                if(err){console.log(err);}
                res.redirect("/admin/manageCourses");
            })
        }else{
            courseModel.updateCourseTime(course._id, date).then((course,err)=>{
                console.log(course);
                if(err){console.log(err);}
                res.redirect("/admin/manageCourses");
            });
        }
        //console.log(course);
    });
});
router.get('/addEvent', function(req, res, next) {
    res.render("adminAddEvent");
});

router.get('/manageEvents',function(req, res, next){
    eventModel.getAllEvents().then((events, err) => {
        if(err) {console.log(err);}
        res.render("adminManageEvents", {"events":events});
    })  
})

router.get('/manageUsers',function(req, res, next){
    userModel.getAllUsers().then((users, err) => {
        if(err) {console.log(err);}
        res.render("adminManageUsers", {"users":users});
    })  
})

router.get('/manageCourses',function(req, res, next){
    courseModel.getAllCourses().then((courses, err) => {
        if(err) {console.log(err);}
        res.render("adminManageCourses", {"courses":courses});
    })  
})

router.post('/manageEvents/:id/delete',function(req, res, next){
    eventModel.deleteEvent(req.params.id).then((event, err) => {
        if(err) {console.log(err);}
        res.redirect("/admin/manageEvents");
    })
})

router.post('/manageUsers/:id/delete',function(req, res, next){
    userModel.deleteUser(req.params.id).then((event, err) => {
        if(err) {console.log(err);}
        res.redirect("/admin/manageUsers");
    })
})

router.post('/manageCourses/:id/delete',function(req, res, next){
    courseModel.deleteCourse(req.params.id).then((event, err) => {
        if(err) {console.log(err);}
        res.redirect("/admin/manageCourses");
    })
})



router.post('/addEvent', function(req, res, next) {
    var name = req.fields.name;
    var address = req.fields.address;
    var city = req.fields.city;
    var zip = req.fields.zip;
    var date = req.fields.date;
    var type = req.fields.type;
    var picture = req.files.picture.path.split("/").pop();
    console.log(picture);
    var event = {
        name:name,
        location:address + ", " + city+" " + zip,
        date:date,
        type: type,
        picture: picture,
    }
    eventModel.create(event).then((event, err) => {
        if(err) {console.log(err);}
        console.log(event);
        res.redirect("/admin");
    })
    
});

router.get('/manageCourses', function(req, res, next) {
    res.render("adminManageCourse");
});

router.get('/manageEvents', function(req, res, next) {
    res.render("adminManageEvent");
});

router.get('/manageUsers', function(req, res, next) {
    res.render("adminManageUser");
});


module.exports = router;


