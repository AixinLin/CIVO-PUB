const MongoClient = require('mongodb').MongoClient;
const user = require('../model/user')
var mongoose = require('mongoose');
const uri = "mongodb+srv://civo:civo123456@cluster0-2uxls.mongodb.net/civo";
mongoose.connect(uri, {useNewUrlParser: true});
var db = mongoose.connection;
db.once('open', function() {
  // we're connected!
  console.log("connected");
});

exports.userModel = mongoose.model('user',new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  courses: [{
    name: String,
    num_of_people: Number,
    start_time: Date,
    end_time: Date,
  }],
  events: String,
  gender: String,
  password: String,
  email: String,
}),'user');

exports.eventModel = mongoose.model('event',new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  location: String,
  participant: [{
    first_name:String,
    last_name: String,
    email:String
  }],
  type: String,
  date: Date
}),'event');

exports.courseModel = mongoose.model('course',new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  num_of_people: Number,
  name: String,
  attendee: [{
    first_name:String,
    last_name: String,
    email:String
  }],
  start_time: Date,
  end_time: Date,
}),'course');


//var abc = new userModel()
user.create({
  id: "3",
  first_name: "yijunhe",
  last_name: "he",
  course_id: "1",
  event_id: "1",
  gender: "male",
  password: "123456",
  type:"exec",
})
//user.create();
// var userModel = require('../model/user').newUser;
// userModel.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });

// var userModel = mongoose.model('newUser',userSchema,"user");
// var newUser = new userModel({
//   id: "1",
//   first_name: "yijun",
//   last_name: "he",
//   course_id: "1",
//   event_id: "1",
//   gender: "male",
//   password: "123456",
//   type:"exec",
// })


// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("civo").collection("user").find({}, function(err, result) {
//     if (err) throw err;
//    // console.log(result);
//   });
//   // perform actions on the collection object
//   //console.log(collection);
//   client.close();
// });



