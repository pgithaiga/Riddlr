/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'mytestapp');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('pretty', true);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

var todos = [
  { description : "Buy eggs",
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 1 day from now
    done : false
  },
  { description : "Write next blog post",
    due : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    done : false
  },
  { description : "Build todo list app",
    due : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    done : true
  },
];

app.get('/', routes.index(todos));
app.get('/users', user.list);

app.post('/todo.json', routes.addTodo(todos));

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});