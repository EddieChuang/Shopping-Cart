var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var Books = require('./models/books.js');

// ----->>> POST BOOKS <<<-----
app.post('/books', function(req, res){
  var book = req.body;
  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

// ----->>> GET BOOKS <<<-----
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

// ----->>> DELETE BOOKS <<<-----
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};  
  Books.remove(query, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

// ----->>> DELETE BOOKS <<<-----
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = {_id: req.params._id};  
  console.log(req.body);
  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      images: book.images,
      price: book.price
    }
  }
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})




// END APIs

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
