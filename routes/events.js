var express = require('express');
var router = express.Router();
var path = require('path');
var courseModel = require('../model/course')
var userModel = require('../model/user')
var eventModel = require('../model/event')
const checkLogin = require('../middlewares/checkLogin').checkLogin

router.get('/',  function(req, res, next) {
  
  eventModel.getAllEvents().then((events,err) => {
    if(err) {console.log(err);}
    res.render("events",{"events":events});
  })
});


router.post('/add', function(req, res, next) {

  let event = {
    name:"school",
    description:"shit is good",
    location:"Toronto",
    type:"member",
    date: new Date()
  }
  eventModel.create(event).then(function(res,err){
    console.log(res);
  })
  res.redirect("/event");
});

router.get('/:id', function(req, res, next) {
  var eventid = req.params.id;
  eventModel.findEventById(eventid).then(function(events,err){
    if(err) {}
    var event = events[0];
    res.render("eventDetail",{"event":event});
  })
});



module.exports = router;
