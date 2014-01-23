var types = ['Chinese', 'Grill', 'Italian', 'Seafood', 'Continental',
'Mexican', 'Greek', 'Thai', 'English', 'Lebanese', 'French', 'Nigerian', 'Curry', 'Southern', 'Chicken'];

var lorem_ispum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. ";

var riddles = lorem_ispum.split('.');

for (var i = 0; i < riddles.length; i++) {
	riddles[i] = riddles[i].trim();
}

for ( var i = 0 ; i <= 30; i++) {

	var randType = Math.floor((Math.random()*(types.length - 1))+0);
	var randContent = Math.floor((Math.random()*(riddles.length - 1))+0);

	var x = { 
		name 		: "Riddle " + i, 
		content 	: riddles[randContent], 
		type 		: types[randType], 
		answerText 	: "answerText",
		answerCoords: "answerCoords",
		clue		: "Clue" + i,
		solvedBy	: [randType, randType % 10 + 1, randContent % 10 + 1 ],
		solveCount 	: 3,
		value 		: 100

	}; 

	db.riddles.insert(x);
}


var names = ["John Taylor", "Alice Smith", "Adam Mckenzie", "Susan Smith", "Ben Franklin", "Sam Philips", "James Brown", 
"Sally Hepburn", "Ken Davies", "Mike Ross"];

for ( var i = 0 ; i <= names.length ; i++ ) {
	
	var x = {
		oauthID : i,
		name : names[i],
		created : Date.now,
		points : i * 100,
		riddlesSolved : [i , i+5, i+7, i*2],
		solveCount : 4
	}

	db.users.insert(x);
}