// Required Files
require('./models/User')
require('./models/Riddle')

// Database
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Riddle = mongoose.model("Riddle");

console.log("Start of db stuff");

//this returns the trending Riddles
exports.trendingRiddles =  function(req, res) {
Riddle.find({}).sort({solveCount:'desc'}).exec(function(err,docs){
	if(err)console.log(err)
	res.send(docs.slice(0,3));
})

};

//this gets the content of the Riddles
exports.loadRiddles = function(req,res,user){
	Riddle.find({}).exec(function(err,docs){
		var riddleNames = [];
		var riddleContent = [];
		if(err)console.log(err)
		docs.forEach(function(object){
			riddleNames.push(object.name);
			riddleContent.push(object.content);
		})
      res.render('home', { 
      title : 'Riddlr Home',
      riddleNames: riddleNames,
      riddleContent: riddleContent,
      userName: user.name

      });

	})
};



console.log("End of db stuff");