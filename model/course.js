var course = require('../config/mongo');
module.exports = {
    create: function(newCourse){
        return course.courseModel.create(newCourse);
        //console.log(user.userModel);
    },
    
}