var course = require('../config/mongo');
var user = require('../config/mongo');
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
        return course.courseModel.findOne({name: courseName});
    },
    updateAttendee: function(courseId, user){
        
        // console.log(num);
        return course.courseModel.findOneAndUpdate({_id:ObjectId(courseId)}, {$addToSet: {attendee:user}})
        
    },
    updateNumOfPeople: function(courseId){
        course.courseModel.aggregate([{$match: {_id: ObjectId(courseId)}}, {$project: {num_of_people: {$size: '$attendee'}}}]).then((result, err) => {
            var num = result[0].num_of_people;
            
            course.courseModel.findOneAndUpdate({_id:ObjectId(courseId)}, {$set: {num_of_people: num}}).then((result, err) => {
                //console.log(result);
            });
        });
    },
    findCourseById: function(courseId){
        return course.courseModel.find({_id:ObjectId(courseId)});
    },
    deleteCourse: function(courseId){
        return course.courseModel.deleteOne({_id:ObjectId(courseId)});
    }
    
}