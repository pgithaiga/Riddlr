var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    oauthID   : String,
    name : String,
    email : String,
    created : Date,
	points : Number
});

var User = mongoose.model("User", UserSchema);
module.exports = User;