var express = require('express');
var router = express.Router();
var path = require('path');
var courseModel = require('../model/course')
var userModel = require('../model/user')
var eventModel = require('../model/event')
var managerModel = require('../model/manager')


const { check, validationResult } = require('express-validator');
// // router.use(bodyParser.urlencoded());
// .use(expressValidator());


router.get('/courseList',function(req, res, next){
    Manager.getManagerByUsername(req.fullName, function(err, manager){
        //Manager.getManagerByUsername(req.user.username, function(err, manager){
        if(err) throw err;
        res.render('manager/courseList', {manager: manager});
    });
});

// router.get('/courseList', function(req, res, next){
//     Manager.getManagerByUsername(req.manager.fullName, function(err, manager){
//     //Manager.getManagerByUsername(req.user.username, function(err, manager){
//         if(err) throw err;
//         res.render('manager/courseList', {manager: manager});
//     });
// });
router.post('/:id/courseList/register', function(req, res){
    info = [];
    info['fullName '] = req.fullName;
    info['course_id'] = req.courses_id;
    info['courses_courseName'] = req.courseName; 

    Manager.register(info, function(err, manager){
        if(err) throw err;
        console.log(manager);
    });

    // req.flash('success_msg', 'Course is successfully added!');
    res.redirect('/manager/courseList');
});

router.get('/:id/addcourselist', (req, res) => {
    var manager = new Manager();
    manager.fullName = req.body.fullName;
    Course.find((err, docs) => {
            if (!err) {
                res.render("manager/addcourselist", {

                    list: docs,
                    viewTitle: "Add Course for" +" " + req.fullName
                });
            }
            else {
                console.log('Error in retrieving manager list :' + err);
            }
        });

 // res.status(200).end();
    // res.render("manager/addcourselist", {
    //     viewTitle: "Add Course for" +" " + req.body.fullName
    // });
});

// router.get('/addcourselist', function(req, res, next) {
//     Class.getClasses(function(err, courses){
//         if(err) throw err;
//         res.render('manager/addcourselist', { courses: courses });
//     },3);
// });


router.get('/index', (req, res) => {
    res.render("manager/m_index");
});


router.post('/index', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

router.get('/', (req, res) => {
    res.render("manager/m_main", {
        viewTitle: "Insert New Manager"
    });
});
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

router.get('/add', (req, res) => {
    res.render("manager/m_addOrEdit", {
        viewTitle: "Insert New Manager"
    });
});


function insertRecord(req, res) {
    var manager = new Manager();
    manager.fullName = req.body.fullName;
    manager.email = req.body.email;
    manager.mobile = req.body.mobile;
    manager.branch = req.body.branch;
    manager.password = req.body.password;
        manager.courseList = req.body.courseList;
    //manager.title = req.body.title;

    manager.save((err, doc) => {
        if (!err)
            res.redirect('manager/m_list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("manager/m_addOrEdit", {
                    viewTitle: "Insert Manager",
                    manager: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    // Manager.findAndModify({ _id: req.body._id }, req.body, { returnOriginal:false }, (err, doc) => {
    Manager.findOneAndUpdate({ _id: req.body._id }, req.body, { returnOriginal:false }, (err, doc) => {
        if (!err) { res.redirect('manager/m_list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("manager/m_addOrEdit", {
                    viewTitle: 'Update Manager',
                    manager: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/m_list', (req, res) => {
    Manager.find((err, docs) => {
        if (!err) {
            res.render("manager/m_list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving manager list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

function getValue(obj){
    var value = obj.value;
    alert(value);
}

 function readradio() {

            // 方法一
            var item = null;
            var obj = document.getElementsByName("age")
            for (var i = 0; i < obj.length; i++) { //遍历Radio
                if (obj[i].checked) {
                    item = obj[i].value;
                }
            }
            alert(item);
 /*
            // 方法二 jquery版本在1.3之前 (FF和chrome下无效)
            item = $('input[name=age][checked]').val();
            alert(item);

            // jquery 1.3 之后使用
            item = $('input[name=age]:checked').val();
            alert(item);

            // 方法三 jquery 读取多个 版本在1.3之前 (FF和chrome下无效)
            $("input[type=radio][checked]").each(function() {
                item =  $(this).val();
                alert(item);
            })

            // jquery 1.3 之后使用
            $("input[type=radio]:checked").each(function() {
                item = $(this).val();
                alert(item);
            })
 */
        }


router.get('/:id', (req, res) => {
    Manager.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("manager/m_addOrEdit", {
                viewTitle: "Update Manager",
                manager: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Manager.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/manager/m_list');
        }
        else { console.log('Error in manager delete :' + err); }
    });
});

//从这里login进去
router.get('/login', (req, res) => {
    res.render("manager/m_login");
    res.status(200).end();
});


router.post('/login', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    Manager.findOne({email:email,password:password},function(err,manager){
        if(err){
            console.log(err);
            res.redirect('/admin/add');
        }
        if(!manager){
            console.log('this is not user');
            res.redirect('/admin/add');
        }
        if(manager){
                res.redirect('/manager')
            }
        })
});

// Log User Out
router.get('/logout', function(req, res){
    req.logout();
    // Success Message
    req.flash('success_msg', "You have logged out");
    res.redirect('/');
});


module.exports = router;
