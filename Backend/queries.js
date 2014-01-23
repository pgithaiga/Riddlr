require('./models/User')
require('./models/Riddle')
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Riddle = mongoose.model("Riddle");

// Returns the top 3 Trending Riddles
exports.trendingRiddles =  function(req, res) {
	
	Riddle.find({}).sort({solveCount:'desc'}).exec(function(err,docs){
		if(err)console.log(err)
		res.send(docs.slice(0,3));
	})
};

// Gets the RiddleName, RiddleContent
exports.loadRiddles = function(req,res,user){
	
	Riddle.find({}).exec(function(err,docs) {
		
		var riddleNames = [];
		var riddleContent = [];
		var riddleTypes = ['Chinese', 'Grill', 'Italian', 'Seafood', 'Continental',
		'Mexican', 'Greek', 'Thai', 'English', 'Lebanese', 'French', 'Curry', 'Southern', 'Chicken'];
		
		if (err) console.log(err)

		docs.forEach(function(riddle){
			riddleNames.push(riddle.name);
			riddleContent.push(riddle.content);
		})
      
      	res.render('home', { 
	      riddleNames: riddleNames,
	      riddleContent: riddleContent,
	      riddleTypes : riddleTypes,
	      riddleCount: docs.length,
	      user : user
	    });
	})
};