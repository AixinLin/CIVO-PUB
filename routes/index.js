module.exports = function (app) {
    app.get('/', function (req, res) {
      res.redirect('/home')
    })
    app.use('/home', require('./home'))
    app.use('/users', require('./users'))
  
    // app.use(function (req, res) {
    //   if (!res.headersSent) {
    //     res.status(404).render('404')
    //   }
    // })
    app.use(function(req, res, next) {
      next(createError(404));
    });
    
  }