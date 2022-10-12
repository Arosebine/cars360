require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const FacebookStrategy = require('./utils/facebook');
const xss = require('xss-clean');
const helmet = require("helmet");
const connectDB = require('./database/mongdb');
const fileupload = require('express-fileupload');
const passport = require('passport');
const session = require('express-session');
const indexapp = require('./routes/index');
const usersapp = require('./routes/users');
const postgresDB = require('./config/db.postgres');
const GoogleStrategy = require('./utils/googleOauth');
const cloudinary = require('./utils/cloundinary');
const multer = require('./utils/multer');









const app = express();
connectDB();

postgresDB();



app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());




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
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileupload());


app.use('/', indexapp);
app.use('/users', usersapp);


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
