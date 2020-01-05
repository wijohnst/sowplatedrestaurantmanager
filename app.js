// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var assert = require('assert');
var app = express();
var MongoClient = require('mongodb').MongoClient;
const dbName = require('./config/dbConfig').dbName;
const url = require('./config/dbConfig').url;

// app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
 
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
// // set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get('env') === 'development' ? err : {};

// // render the error page
// res.status(err.status || 500);
// res.render('error'); 
// });
MongoClient.connect(url, function(err, client){
  assert.equal(null,err);
  console.log('Connected successfully to MongoDb...');

  const database = client.db(dbName);
  if (err) return console.log(`Mongo DB Client Error: ${err}`)

  require('./routes/index')(app, database)

  var port = process.env.PORT || '3000';
  app.listen(port, () =>{
    console.log(`Live on ${port}...`)
  })
})
module.exports = app;
