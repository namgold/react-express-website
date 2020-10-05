const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('../controller/index');
const usersRouter = require('../controller/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${process.env.REACT_SCHEME}://${process.env.REACT_HOST}:${process.env.REACT_PORT}`);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((error, req, res) => {
  error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500).json({ error });
});

module.exports = app;
