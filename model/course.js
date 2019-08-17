var course = require('../config/mongo');
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    create: function(newCourse){
        return course.courseModel.create(newCourse);
        //console.log(user.userModel);
    },
    getAllCourses: function(){
        return course.courseModel.find({});
    },
    findCourseByNameTime: function(courseName, courseTime){
        return course.courseModel.find({name: courseName});
    },
    updateAttendee: function(courseId, user){
        return course.courseModel.findOneAndUpdate({_id:ObjectId(courseId)}, {$addToSet: {attendee:user}});
    },
    findCourseById: function(courseId){
        return course.courseModel.find({_id:ObjectId(courseId)})
    }
}