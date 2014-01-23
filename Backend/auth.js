// Module Dependencies
var config = require('./config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// Database Models
require('./models/User');
var mongoose = require('mongoose');
var User = mongoose.model("User");


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
        oauthID : profile.id,
        name    : profile.displayName,
        created : Date.now(),
        points  : 200
      });

      user.save(function(err) {
        
        if(err) { 
          console.log(err); 
        } else {
          done(null, user);
        };
      });

      //done(null, profile);
    
    };
  
  });
}));