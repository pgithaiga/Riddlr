var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    oauthID : Number,
    name : String,
    created : Date,
	points : Number,
	riddlesSolved : Array
});

var User = mongoose.model("User", UserSchema);
module.exports = User;