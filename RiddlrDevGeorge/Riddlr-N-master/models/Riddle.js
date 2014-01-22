var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Riddle = new Schema({
	name : String,
	content: String,
	type : String,
	answerText : String,
	answerCoords : String,
	clue : String,
	solvedBy : Array
});

mongoose.model('Riddle', Riddle);