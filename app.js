var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('./config/mongo');
var session = require('express-session');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var eventRouter = require('./routes/events');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup

app.use(session({
  cookie: { maxAge: 2628000000 },
  // store: new (require('express-sessions'))({
  //     url: "mongodb+srv://civo:<password>@cluster0-2uxls.mongodb.net/test?retryWrites=true&w=majority"
  //     // instance: mongoose, // optional
  //     // host: 'localhost', // optional
  //     // port: 27017, // optional
  //     // db: 'test', // optional
  //     // collection: 'sessions', // optional
  //     // expire: 86400 // optional
  // }),
   // 设置 cookie 中保存 session id 的字段名称
  secret: "civo", // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
}));

//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
//app.use(express.json()).use(express.urlencoded());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/images'), // 上传文件目录
  keepExtensions: true// 保留后缀
}));


app.use('/', homeRouter);
// app.use('/admin', adminRouter);
app.use('/courses',coursesRouter);
//app.use('/course',courseRouter);
app.use('/events',eventRouter);
app.use('/admin', adminRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.message);
  //console.log(err);
  //res.render('error');
});


module.exports = app;
