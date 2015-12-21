var Datastore = require('nedb')
	, db = { };

db.team = new Datastore({ filename: './database/team.json', autoload: true });
db.player = new Datastore({ filename: './database/player.json', autoload: true });
db.match = new Datastore({ filename: './database/match.json', autoload: true });
db.score = new Datastore({ filename: './database/score.json', autoload: true });

function generateRandomInt(min, max){
	return Math.round(min + Math.random() * (max-min));
}

module.exports = function(app){

	app.get(/^\/api\/(\w+)\/?(\w+)?$/, function (req, res) {
		var entity = req.params[0];
		var id = req.params[1];

		if(!entity || !db[entity]){
			res.status(400).send('Bad Request: Bad Entity or Missing ID');
		}else{
			if(id){
				db[entity].findOne({_id: id}, function(err, doc){
					if(!err){
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify(doc || {}));
					}else{
						res.status(400).send('Bad Request: '+err.message);
					}
				});
			}else{
				db[entity].find(req.query, function(err, doc){
					if(!err){
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify(doc));
					}else{
						res.status(400).send('Bad Request: '+err.message);
					}
				});
			}
		}
  });

	app.post(/^\/api\/(\w+)\/?(\w+)?$/, function (req, res) {
		var entity = req.params[0];
		var id = req.params[1];

		if(!entity || !id || !db[entity]){
			res.status(400).send('Bad Request: Bad Entity or Missing ID');
		}else{
			db[entity].update({_id: id}, {$set: req.body}, function(err, num){
				if(!err){
					if(num > 0){
						db[entity].findOne({_id: id}, function(err, doc){
							if(!err){
								res.setHeader('Content-Type', 'application/json');
								res.send(JSON.stringify(doc));
							}else{
								res.status(400).send('Bad Request: '+err.message);
							}
						});
					}else{
						res.status(400).send('Bad Request: Invalid ID');
					}
				}else{
					res.status(400).send('Bad Request: '+err.message);
				}
			});
		}
  });

	app.put(/^\/api\/(\w+)\/?(\w+)?$/, function (req, res) {
		var entity = req.params[0];
		var id = req.params[1];

		if(!entity || !id || !db[entity]){
			res.status(400).send('Bad Request: Bad Entity or Missing ID');
		}else{
			db[entity].insert(req.body, function(err, doc){
				if(!err){
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify(doc));
				}else{
					res.status(400).send('Bad Request: '+err.message);
				}
			});
		}
  });

	app.delete(/^\/api\/(\w+)\/?(\w+)?$/, function (req, res) {
		var entity = req.params[0];
		var id = req.params[1];

		if(!entity || !id || !db[entity]){
			res.status(400).send('Bad Request: Bad Entity or Missing ID');
		}else{
			db[entity].remove({_id: id}, function(err, num){
				if(!err){
					if(num > 0){
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify({status: 'success'}));
					}else{
						res.status(400).send('Bad Request: Invalid ID');
					}
				}else{
					res.status(400).send('Bad Request: '+err.message);
				}
			});
		}
	});

	app.ws('/results', function(ws, req) {
		db.player.find({}, function(err, players){
			if(!err){
				var interv;

				ws.on('close', function(msg) {
					clearInterval(interv);
				});

				ws.on('message', function(msg) {
					msg = JSON.parse(msg);
					if(msg.action == "start"){
						interv = setInterval(function(){
							var result = {};
							result.p1 = players[generateRandomInt(0, players.length-1)]._id;
							result.p2 = players[generateRandomInt(0, players.length-1)]._id;
							if(Math.round(Math.random())){
								result.score = "3-"+generateRandomInt(0,2);
							}else{
								result.score = generateRandomInt(0,2)+"-3";
							}

							ws.send(JSON.stringify([result]));
						}, 200);
					}else if(msg.action == "stop"){
						clearInterval(interv);
					}
				});
			}
		});
	});

	app.get('/*', function (req, res) {
  	res.render('app');
  });
}
