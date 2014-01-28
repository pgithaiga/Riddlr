require('./models/User')
require('./models/Riddle')
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Riddle = mongoose.model("Riddle");

exports.loadRiddles = function(req,res,user) {

	var queryCount = 2;
	var riddleNames = [];
	var trendingRiddles = [];
	var all = [];
	var riddleContent = [];
	var riddleTypes = ['Chinese', 'Grill', 'Mexican', 'Seafood', 'Italian',
		'Continental', 'Greek', 'Curry', 'Thai', 'Southern', 'Chicken'];

	Riddle.find({}).sort({solveCount:'desc'}).exec(function(err,docs) {
		
		if(err) console.log(err);

		for (var i = 0; i < 3; i++) {
			riddle = docs[i];
			trendingRiddles.push(riddle.name);
		}

		queryCount -= 1;

		if (queryCount === 0) sendResponse();
	});

	Riddle.find({}).exec(function(err,docs) {

		if (err) console.log(err);

		docs.forEach(function(riddle) {
			riddleNames.push(riddle.name);
			riddleContent.push(riddle.content);
		});

		all = docs;

		queryCount -= 1;

		if (queryCount === 0) sendResponse();
	});

	var sendResponse = function() {

		res.render('home', { 
	      riddleNames: riddleNames,
	      riddleContent: riddleContent,
	      riddleTypes : riddleTypes,
	      riddleCount: riddleContent.length,
	      user : user,
	      allRiddleInfo : all,
	      trendingRiddles : trendingRiddles
	    });
	};	
};