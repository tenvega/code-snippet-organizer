const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash-messages');
const Lroutes = require('./routes/login');

// require stuff for passport
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
// bluebird is a promise library. checkout bluebirdjs.org
const bluebird = require('bluebird');
// set mongoose's primise library to be bluebird
mongoose.Promise = bluebird;
//require schema files
const User = require('./models/user');
const Snippet = require('./models/codeSnpt')

const url = 'mongodb://localhost:27017/code';

// create express app
const app = express();

// tell express to use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//express session
app.use(
  session({
    secret: 'capsul',
    resave: false,
    saveUninitialized: true
  })
);

// connect passport to express boilerplate
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//tell express to use the bodyParser middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //change to true?



// this middleware function will check to see if we have a user in the session.
// if not, we redirect to the login form.
//endpoints
const requireLogin = (req, res, next) => {
  console.log('req.user', req.user);
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', requireLogin, (req, res) => {
  res.render('home', { user: req.user });
});


app.get('/register', (req, res) => {
  res.render('registerForm');
});

app.post('/register', (req, res) => {
  let user = new User(req.body);
  user.provider = 'local';
  user.setPassword(req.body.password);

  user
    .save()
    // if good...
    .then(() => res.redirect('/'))
    // if bad...
    .catch(err => console.log(err));
});

app.use('/', Lroutes);

mongoose.connect(url, (err, conection) => {
  if (!err)
    console.log('connected to Mongo.');

});



mongoose
  // connect to mongo via mongoose
  .connect('mongodb://localhost:27017/codesnippets', { useMongoClient: true })
  // now we can do whatever we want with mongoose.
  // configure session support middleware with express-session
  .then(() => app.listen(3000, () => console.log('ready to roll!!')));
