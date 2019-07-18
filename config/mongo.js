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
  id: String,
  first_name: String,
  last_name: String,
  course_id: String,
  event_id: String,
  gender: String,
  password: String,
  type:String
}),'user');

exports.eventModel = mongoose.model('eventModel',new mongoose.Schema({
  id: String,
  title: String,
  name: String,
  description: String,
  location: String,
  participant: String,
  type: String
}));

exports.courseModel = mongoose.model('courseModel',new mongoose.Schema({
  id: String,
  num_of_people: Number,
  title: String,
  location: String,
  participant: String,
  start_time: Date,
  end_time: Date,
}));


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



