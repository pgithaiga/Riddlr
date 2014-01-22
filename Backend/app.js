
/**
 * Module dependencies.
 */

require('./models/User')
require('./models/Riddle')

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./oauth.js')

// db models
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Riddle = mongoose.model("Riddle");

// auth strategy -- should be in another file
passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
  User.findOne({ oauthID: profile.id }, function(err, user) {
    if(err) { console.log(err); }
    if (!err && user != null) {
      done(null, user);
    } else {
      var user = new User({
        oauthID: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        created: Date.now(),
        points : 200
      });
      user.save(function(err) {
        if(err) { 
          console.log(err); 
        } else {
          console.log("saving user ...");
          done(null, user);
        };
      });
    };
  });
}
));

// seralize and deseralize
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


var app = express();
var db = mongoose.createConnection('localhost', 'Riddlr');

// all environments
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//query testing
console.log("Start of db stuff");
// Riddle.find({ } , function (err, items) {
//     console.log(items); // outputs []
//     console.log(err); // outputs null
//     items.forEach( function(item) {
//         console.log(item); // does not reach this code
//     });
// });
app.get('/test', function(req, res) {

  Riddle.find({ }, function(err, results) {
    if (err) {console.log(err);}
    res.send(results);
  });

});
//var list = query.sort('solveCount');

console.log("End of db stuff");


// routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
  });
app.get('/auth/facebook/callback', function(req, res) {
	res.send("facebook login succes");
});

app.get('/db', function(req, res){
	console.log(User.findOne());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
