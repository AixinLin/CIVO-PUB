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
    res.render("forms");
});

router.get('/addEvent', function(req, res, next) {
    res.render("adminAddEvent");
});

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


