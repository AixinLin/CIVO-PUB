const mongoose = require('mongoose');

var managerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    branch: {
        type: String
    },
    job:{
        type:String
    },
    password:{
        type: String
    },
    courseList:[{
        course_id:{type: [mongoose.Schema.Types.ObjectId]},
        courses_courseName: {type:String}
        // courseName:{type:String},
        // video:{type:String},
        // pdf:{type:String}
    }]
});

// Custom validation for email
managerSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


var Manager = module.exports = mongoose.model('Manager', managerSchema);
// mongoose.model('Manager', managerSchema);


module.exports.getManagerByUsername = function(fullName){
    var query = {fullName: fullName};
    Manager.findOne(query);
}


// Register manager for course
//这里的callback删了
module.exports.register = function(info) {
    fullName = info['fullName'];
    course_id = info['course_id'];
    courseName = info['courseName'];

    var query = {fullName: fullName};
    // Manager.findAndModify(
    Manager.findOneAndUpdate(

      query,
      {$push: {"courseList": {course_id: course_id, courseName: courseName}}},
      {safe: true, upsert: true},
      // callback
    );
}

function addCourse(req, res) {
    var course = new Course();
    course.courseName = req.body.courseName;
    course.video = req.body.video;
    course.pdf = req.body.pdf;
    course.other = req.body.other;

    //manager.title = req.body.title;

//check if the manager exist
    course.save((err, doc) => {
        if (!err)
            res.redirect('manager/m_list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("manager/m_addcourselist", {
                    viewTitle: "Add Course",
                    manager: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}
