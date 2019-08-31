var user = require('../config/mongo');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    create: function(newUser){
        return user.userModel.create(newUser);
        //console.log(user.userModel);
    },
    deleteByName: function(name){
        return user.userModel.deleteMany({first_name: "yijunhe"});
    },
    addCourse: function(course, userId){
        return user.userModel.findOneAndUpdate({_id:ObjectId(userId)}, {$addToSet: {courses:course}});
    },
    findUserById: function(userId){
        return user.userModel.find({_id:ObjectId(userId)});
    },
    findUserByEmailandPassword: function(email, password){
        return user.userModel.findOne({email:email, password:password});
    },
    getAllUsers: function(){
        return user.userModel.find({});
    },
    deleteUser: function(userId){
        return user.userModel.deleteOne({
            _id:ObjectId(userId)
        })
    },
    getNumOfPeople: function(userId){
        return user.userModel.aggregate([
            //{"$match" : {"_id": {$eq: ObjectId(userId)}}},
            { "$unwind": "$courses" },
            { "$lookup": {
                "from": "course",
                "localField": "courses._id",
                "foreignField": "_id",
                "as": "coursesObjects"
             }},
             {"$match" : {_id: ObjectId(userId)}},
             
        ]);
    }
    
}


// exports.newUser = new userModel({
//     id: "2",
//     first_name: "yijunhe",
//     last_name: "he",
//     course_id: "1",
//     event_id: "1",
//     gender: "male",
//     password: "123456",
//     type:"exec",
//   })

//save
// newUser.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   });
  