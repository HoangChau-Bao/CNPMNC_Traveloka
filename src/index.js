const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const handlebars = require('express-handlebars');
const flash = require('connect-flash');
const sql = require('mssql');
const app = express();
const port = 3000;

//const routes
const route = require('./routes');
const fileUpload = require('express-fileupload');

//Sessionstore
app.use(
  session({
    secret: 'mysecret',
  }),
);

//Http logger
app.use(morgan('combined'));

//scss
app.use(express.static(path.join(__dirname, 'public')));

//file-upload
app.use(fileUpload());

//middleware
app.use(
  express.urlencoded({
    extended: true, //body parser được tích học từ express 4.16
  }),
);

//flash
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//dynamic header
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

//Cors
app.use(cors());

//Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    //partialsDir: path.join(__dirname, 'views/partials'),
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// app.get('/', (req,res) => {
//     res.render('home');
// })

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
