var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('./config/mongo');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var courseRouter = require('./routes/course');
var eventRouter = require('./routes/event');

var app = express();

// view engine setup


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
//app.use(express.json()).use(express.urlencoded());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/courses',coursesRouter);
app.use('/course',courseRouter);
app.use('/event',eventRouter);


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
