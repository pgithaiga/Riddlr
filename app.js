// Module Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var nodemailer = require("nodemailer");
var config = require('./config');
var queries = require('./queries');
var FB = require('fb');

// Required Files
require('./models/User')
require('./models/Riddle')
require('./auth')

// Database
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Riddle = mongoose.model("Riddle");

var app = express();
//var db = mongoose.connect('mongodb://localhost/Riddlr');
var db = mongoose.connect('mongodb://nodejitsu:9b291c2b19339cdf6ea45937347c1842@troup.mongohq.com:10043/nodejitsudb8011386150');

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.favicon(path.join(__dirname, 'public/images/favicon.png')));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({
        secret: 'the a team'
    }));
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
    User.findById(id, function(err, user) {
        console.log(user)
        if (!err) done(null, user);
        else done(err, null)
    })
});

// Check if user has been authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signup');
}

var congratsEmail = function(email) {
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "tosman9000@gmail.com",
            pass: "opebino5"
        }
    });
    //Send an e-mail using the connection object
    smtpTransport.sendMail({
        from: "Riddlr <tosman9000@gmail.com>", // sender address
        to: "User <" + email + ">", // comma separated list of receivers
        subject: "Congratulations", // Subject line
        text: "You solved the riddle correctly!\nYou have just gained 200 more points!!!" // plaintext body
    }, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });
};


// Routes
app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.render('index', {
            title: 'Express'
        });
    }
});

app.get('/landing', function(req, res) {
    res.render('index');
});


app.get('/subscription', function(req, res) {

    var verifyToken = config.facebook.verifyToken;
    var hub_mode = req.param('hub.mode');
    var hub_verify_token = req.param('hub.verify_token');

    if (hub_mode === "subscribe" && hub_verify_token === verifyToken) {
        res.send(req.param('hub.challenge'));
    } else {
        res.send("error");
    }
});

app.post('/subscription', function(req, res) {

    var userid = req.body.entry[0].id;

    User.findOne({ oauthID: userid }).exec(function(err, user) {
        
        console.log("user name" + user.name);
        if (err) console.log(err);
        
        FB.setAccessToken(user.accessToken);
        FB.api("/" + userid + "/statuses?limit=1", {fields: ['message', 'place']}, function(response) {
            if (response && !response.error) {
                var message = response.data[0].message;
                console.log(message);
                if (message === 'riddlr') {
                    congratsEmail(user.email);
                    console.log('email sent');
                    user.points += 200;
                    user.solveCount += 1;
                    user.save();
                }
            }
        });
    });
});


app.get('/signup', passport.authenticate('facebook', {
    scope: ['read_stream', 'email']
}));


app.get('/login', function(req, res) {
    User.findById(req.session.passport.user, function(err, user) {

        req.login(user, function(err) {
            if (err) {
                console.log(err);
            }

            return res.redirect('/home');
        });
    })
});

app.get('/home', ensureAuthenticated, function(req, res) {

    User.findById(req.session.passport.user, function(err, user) {

        if (err) {
            console.log(err);
        } else {
            queries.loadRiddles(req, res, user);
        }
    })
});

app.get('/redirect', passport.authenticate('facebook', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/home');
});

app.get('/logout', function(req, res) {

    req.logout();
    res.render('index');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});