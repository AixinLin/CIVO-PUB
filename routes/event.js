var express = require('express');
var router = express.Router();
var path = require('path');
var courseModel = require('../model/course')
var userModel = require('../model/user')
var eventModel = require('../model/event')

router.get('/', function(req, res, next) {
  var eventid = "5d51ca1e4e73a615759129d1";
  eventModel.findEventById(eventid).then(function(events,err){
    if(err) {}
    var event = events[0];
    res.render("eventDetail",{"event":event});
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

// router.get('/:id', function(req, res, next) {
//   res.render("test",{"title":"Course"});
// });



module.exports = router;
