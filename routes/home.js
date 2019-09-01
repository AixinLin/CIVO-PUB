var express = require('express');
var router = express.Router();
var userModel = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  res.render("index", {"user":req.session.user});
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
      if(user !== null){
        req.session.user = user;
      }else{
        res.send("username or password is incorrect");
      }
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
  var first_name = req.fields.firstname;
  var last_name = req.fields.lastname;


  var newUser = {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name
  }

  userModel.findUserByEmail(email).then((result,err) => {
    if(err) {console.log(err)}
    if(result === null){
      userModel.create(newUser).then(function(user,err){
        if(err) {console.log(err);}
        console.log(user);
        req.session.user = user;
        res.redirect('/');
      })
    }else{
      res.send("Email Already Exist");
    }
  })
  
  
});
module.exports = router;
