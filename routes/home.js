var express = require('express');
var router = express.Router();
var userModel = require('../model/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get('/login', function(req, res, next) {
  res.render("login");
});

router.get('/about', function(req, res, next) {
  res.render("about");
});

router.get('/sponsors', function(req, res, next) {
  res.render("sponsors");
});


router.post('/login', (req, res, next) => {
    var email = req.fields.email;
    var password = req.fields.password;
    userModel.findUserByEmailandPassword(email,password).then(function(user,err){
      if(err) {console.log(err);}
      req.session.user = user;
      res.redirect("/");
    })
});



// Log User Out
router.get('/logout', function(req, res){
  req.session.user = null
  // Success Message
  //req.flash('success_msg', "You have logged out");
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render("register")
});

router.post('/register', function(req, res, next) {
  var email = req.fields.email;
  var password = req.fields.password;

  let user = {
    email: email,
    password: password,
  }

  userModel.create(user).then(function(result,err){
    if(err) {console.log(err);}
    console.log(result);
    res.redirect('/');
  })
  
});
module.exports = router;
