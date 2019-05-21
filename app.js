var createError = require('http-errors');
var expressValidator = require('express-validator');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
//var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var socket = require ('socket.io');
var session = require('express-session')
var bodyParser = require('body-parser');
var formidable = require('formidable');


var app = express();
app.use(session({secret:'password',/*
resave:true,
saveUnitialized:true*/
}))



var http = http.Server(app);
var io = socket(http);



io.on('connection', function (socket){

  console.log('usuario conectou');
  


  global.socket_io = socket;


});






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname,'public'))

//app.use('/admin', adminRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(expressValidator());






// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





http.listen(8080,function(){



  console.log('servidor online');

});

