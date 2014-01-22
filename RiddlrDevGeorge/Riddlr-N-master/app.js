
// Module Dependencies
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config')

// Required Files
require('./models/User')
require('./models/Riddle')
require('./auth')

//Required Functions
var dbQueries = require('./dbQueries');

// Database
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Riddle = mongoose.model("Riddle");

var app = express();
var db = mongoose.connect('mongodb://localhost/Riddlr');

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'the a team' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Serializing & Deserializing Users for User Seissions
passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id)
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        console.log(user)
        if(!err) done(null, user);
        else done(err, null)  
    })
});

// Check if user has been authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/signup');
}

// Routes
app.get('/', routes.index);
app.get('/test', dbQueries.trendingRiddles);
app.get('/riddles',dbQueries.loadRiddles);



app.get('/signup', passport.authenticate('facebook'));

app.get('/login', function(req, res) {
  User.findById(req.session.passport.user, function(err, user) {
      
      req.login(user, function(err) {
        if (err) {
          console.log(err); }

        return res.redirect('/home');
      });
  })
});
  
app.get('/home', ensureAuthenticated, function(req, res) {
	
	User.findById(req.session.passport.user, function(err, user) {
	    
	    if(err) { 
	      console.log(err); 
	    
	    } else {
        dbQueries.loadRiddles(req,res,user);


	    }
	})
});

app.get('/redirect', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/home');
});

app.get('/logout', function(req, res) {

  // logout dosent work properly yet
  req.logout();
  res.send("log out done");
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});