var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Riddle = new Schema({
	name : String,
	content: String,
	type : String,
	answerText : String,
	answerCoords : String
});

mongoose.model('Riddle', Riddle);