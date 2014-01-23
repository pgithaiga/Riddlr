var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Riddle = new Schema({
	name : String,
	content: String,
	type : String,
	answerText : String,
	answerCoords : String,
	clue : String,
	solvedBy : Array,
	solveCount : Number,
	value : Number
});

mongoose.model('Riddle', Riddle);