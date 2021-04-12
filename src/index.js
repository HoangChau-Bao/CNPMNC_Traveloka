const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars  = require('express-handlebars');
const app = express();
const port = 3000;

//Http logger
app.use(morgan('combined'));


//scss
app.use(express.static(path.join(__dirname, 'public')));

//Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    //partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

app.get('/', (req,res) => {
    res.render('home');
})
app.set('views', path.join(__dirname, 'resources', 'views'));


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });