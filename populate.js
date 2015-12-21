var Datastore = require('nedb')
	,	async = require('async')
	, argv = require('yargs').argv
	, db = { };

var howmany = argv.howmany || 5;
var divisions = argv.divisions || 2;
var playersPerTeam = argv.playersPerTeam || 4;

db.team = new Datastore({ filename: './database/team.json', autoload: true });
db.player = new Datastore({ filename: './database/player.json', autoload: true });

/* RANDOMIZERS */

function generateRandomInt(min, max){
	return Math.round(min + Math.random() * (max-min));
}

function generateRandomName(){
	var first = ['Steve', 'John', 'Dave', 'Dan', 'Edward', 'James', 'Adriano', 'Ian', 'Bill', 'Harry'];
	var last = ['Stevenson', 'Johnson', 'Davidson', 'Daniels', 'Edwards', 'James', 'Domingo', 'Blake', 'Hutch'];

	var f = generateRandomInt(0, first.length - 1);
	var l = generateRandomInt(0, last.length - 1);

	return first[f]+" "+last[l];
}

function generateRandomTeamName(){
	var first = ['Dobby', 'Lobby', 'Mobby', 'Tobby', 'Testers', 'Grunts', 'Banjo', 'Bramble', 'Truckers', 'Wunderers'];
	var last = ['United', 'Soccer', 'FC', 'UTD', 'AS', 'Lokomotiv', 'PFC', 'Mens', 'Seniors'];

	var f = generateRandomInt(0, first.length - 1);
	var l = generateRandomInt(0, last.length - 1);

	return first[f]+" "+last[l];
}

/* DEFINE EACH POPULATOR */

var teams = [];
function createTeams(callback){
	//generate a list of users
  for(var div=1; div <= divisions; div++){

  	for(var i=0; i < howmany; i++){
  		var name = generateRandomTeamName();

  		var team = {
  			name: generateRandomTeamName()+' '+generateRandomInt(1, 5),
        bonuses: [],
        penalties: [],
        division: div+""
  		}

  		db.team.insert(team);
  	}
  }

  db.team.find({}, function (err, docs) {
    teams = docs;
    callback(err);
  });
}

var players = [];
function createPlayers(callback){
  for(var d in teams){
    for(var j=0; j < playersPerTeam; j++){
      var player = {
        name: generateRandomName(),
        team: teams[d]._id,
        rating: generateRandomInt((divisions + 1 - parseInt(teams[d].division)) * 500, (divisions + 1 - parseInt(teams[d].division)) * 750), //elo seeding
      }

      db.player.insert(player);
    }
  }

  db.player.find({}, function (err, docs) {
    players = docs;
    callback(err);
  });
}

async.series([
  createTeams,
  createPlayers,
], function(err){
	if(!err){
		console.log("Succesfully created ", howmany, " teams of ", playersPerTeam ," players each, for ", divisions ," divisions!");
	}else{
		console.log(err);
	}
});
