var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../controller/index');
var usersRouter = require('../controller/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.REACT_SCHEME + '://' + process.env.REACT_HOST + ":" + process.env.REACT_PORT);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(error, req, res, next) {
    error = req.app.get('env') === 'development' ? error : {};
    res.status(error.status || 500).json({ error });
});

module.exports = app;
