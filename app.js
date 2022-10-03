const dotenv = require('dotenv');
dotenv.config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require("helmet");
const connectDB = require('./database/mongdb');
const db = require("./database/postgresql");



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');



const app = express();
connectDB();

// connect to db
db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!!!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// sync
db.sequelize.sync()

// to force sync during development
//db.sequelize.sync({ force: true }).then(() => {
//console.log("Drop and re-sync db.");
//});


const port = process.env.PORT || 6750

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});



app.listen(port, ()=>{
  console.log(`the Car360 server is running on port http://localhost:${port}`);
  console.log(process.env.NODE_ENV);
});
