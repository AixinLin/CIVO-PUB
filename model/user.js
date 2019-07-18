var user = require('../config/mongo');
var mongoose = require('mongoose');
module.exports = {
    create: function(newUser){
        return user.userModel.create(newUser);
        //console.log(user.userModel);
    },
    
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
  