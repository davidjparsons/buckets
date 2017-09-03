// Basic Setup
var http     = require('http');
	express  = require('express');
	mysql    = require('mysql');
	parser   = require('body-parser');
    dotenv   = require('dotenv').config();

// //EasyTimer.js
// var Timer = require('easytimer');
 
// Database Connection
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});
try {
	connection.connect();
	
} catch(e) {
	console.log('Database Connetion failed:' + e);
}


// Setup express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
 

//use app.use instead of app.get https://stackoverflow.com/questions/38757235/express-how-to-send-html-together-with-css-using-sendfile
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

// MYSQL QUERIES
var qAllLeagues = 'SELECT * from league'
var qAllTeams = 'SELECT * from team'
var qAllPlayers = 'SELECT * from player'
var qAllStatTypes = 'SELECT * from statType'

// ROUTING
app.get('/', function(req, res) {
 res.render('index');
});

// ROUTES FOR NAV
app.get('/leagues', function(req, res) {
  console.log(req);
 
	connection.query(qAllLeagues, function(err, rows, fields) {
  		if (!err){
  			res.render('leagues', {data: rows});
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

app.get('/teams', function(req, res) {
	console.log(req);
	 
		connection.query(qAllTeams, function(err, rows, fields) {
	  		if (!err){
	  			res.render('teams', {data: rows});
	  		} else {
			    res.status(400).send(err);
		  	}
	});
});

app.get('/players', function(req, res) {
	console.log(req);
	 
		connection.query(qAllPlayers, function(err, rows, fields) {
	  		if (!err){
	  			res.render('players', {data: rows});
	  		} else {
			    res.status(400).send(err);
		  	}
	});
});

app.get('/stat-types', function(req, res) {
	console.log(req);
	 
		connection.query(qAllStatTypes, function(err, rows, fields) {
	  		if (!err){
	  			res.render('stat-types', {data: rows});
	  		} else {
			    res.status(400).send(err);
		  	}
	});
});

app.get('/games', function(req, res) {
 res.render('games');
});

app.get('/current-game', function(req, res) {
 res.render('current-game');
});



//league related Endpoints below
//Endpoint: http://localhost:3000/api/league/new add new
/*app.post('/api/league/add', function (req,res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' && 
		typeof req.body.location !== 'undefined' && 
        typeof req.body.sport !== 'undefined' 
	) {
		var name = req.body.name, location = req.body.location, sport = req.body.sport;

		connection.query('INSERT INTO league (name, location, sport) VALUES (?, ?, ?)', 
			[name, location, sport], 
			function(err, result) {
		  		if (err) { res.status(400).send(err); return; }
                  {
					if (result.affectedRows != 0) {						
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}
					
					res.setHeader('Content-Type', 'application/json');
					res.status(200).send(JSON.stringify(response));					
		  		} 
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(JSON.stringify(response));
	}
}); */


// Endpoint: http://localhost:3000/api/league/{:league id} search a particular league id
app.get('/api/league/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('SELECT * from league where id = ?', [id], function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// // Endpoint: http://localhost:3000/api/league search all leagues
// app.get('/api/league', function (req,res) {
// 	console.log(req);
 
// 	connection.query('SELECT * from league', function(err, rows, fields) {
//   		if (!err){
//   			res.render('leagues', {data: rows});
//   		} else {
// 		    res.status(400).send(err);
// 	  	}
// 	});
// });

// Endpoint: http://localhost:3000/api/league search all leagues
app.get('/api/league', function (req,res) {
	console.log(req);
 
	connection.query(qAllLeagues, function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
	    	res.render('leagues', {rows:rows});
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// rewrote by korynunn
app.post('/api/league', function (request, response) {
    var name = request.body.name,
        location = request.body.location,
        sport = request.body.sport;

    if(!name || !location || !sport){
        return response.status(422).send(JSON.stringify({message: 'Please fill required details'}));
    }

    connection.query(
        'INSERT INTO league (name, location, sport) VALUES (?, ?, ?)', 
        [name, location, sport],
        function(error, result){
            if(error){
                return response.status(500).send();
			}

			response.status(200).redirect('back');
        }
    );
});


app.post('/api/team', function (request, response) {
    var name = request.body.name,
        leagueId = request.body.leagueId;        

    if(!name || !leagueId){
        return response.status(422).send(JSON.stringify({message: 'Please fill required details'}));
    }

    connection.query(
        'INSERT INTO team (name, leagueId) VALUES (?, ?)', 
        [name, leagueId],
        function(error, result){
            if(error){
                return response.status(500).send();
			}

			response.status(200).redirect('back');
        }
    );
});


//team related Endpoints below
//Endpoint: http://localhost:3000/api/team/add add new
// app.post('/api/team', function (req,res) {
// 	var response = [];

// 	if (
// 		typeof req.body.name !== 'undefined' && 		
//         typeof req.body.leagueId !== 'undefined' 
// 	) {
// 		var name = req.body.name, leagueId = req.body.leagueId;

// 		connection.query('INSERT INTO team (name, leagueId) VALUES (?, ?)', 
// 			[name, leagueId], 
// 			function(err, result) {
// 		  		if (err) { res.status(400).send(err); return; }
//                   {
// 					if (result.affectedRows != 0) {
// 						response.push({'result' : 'success'});
// 					} else {
// 						response.push({'msg' : 'No Result Found'});
// 					}

// 					res.setHeader('Content-Type', 'application/json');
// 			    	res.status(200).send(JSON.stringify(response));
// 		  		} 
// 			});

// 	} else {
// 		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
// 		res.setHeader('Content-Type', 'application/json');
//     	res.status(200).send(JSON.stringify(response));
// 	}
// });

// Endpoint: http://localhost:3000/api/team/{:team id} search a particular team id
app.get('/api/team/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('SELECT * from team where id = ?', [id], function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Endpoint: http://localhost:3000/api/team search all teams
app.get('/api/team', function (req,res) {
	console.log(req);
 
	connection.query(qAllTeams, function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

app.post('/api/player', function (request, response) {
    var first_name = request.body.first_name,
        last_name = request.body.last_name,   
        date_of_birth = request.body.date_of_birth,
        position = request.body.position,        
        number = request.body.number,    
        teamId = request.body.teamId;            

    if(!first_name || !last_name || !position || !number || !teamId){
        return response.status(422).send(JSON.stringify({message: 'Please fill required details'}));
    } 
    if(!date_of_birth){
        return response.status(422).send(JSON.stringify({message: 'dob is culprit'}));
    }

		connection.query('INSERT INTO player (first_name, last_name, date_of_birth, position, number, teamId) VALUES (?, ?, ?, ?, ?, ?)', 
			[first_name, last_name, date_of_birth, position, number, teamId], 
        function(error, result){
            if(error){
                return response.status(500).send();
			}

			response.status(200).redirect('back');
        }
    );
});

//player related Endpoints below
//Endpoint: http://localhost:3000/api/player/add add new. date_of_birth = yyyy-mm-dd
// app.post('/api/player', function (req,res) {
// 	var response = [];

// 	if (
// 		typeof req.body.first_name !== 'undefined' && 
// 		typeof req.body.last_name !== 'undefined' && 
// 		typeof req.body.date_of_birth !== 'undefined' && 
// 		typeof req.body.position !== 'undefined' && 
// 		typeof req.body.number !== 'undefined' && 		
//         typeof req.body.teamId !== 'undefined' 
// 	) {
// 		var first_name = req.body.first_name, last_name = req.body.last_name, date_of_birth = req.body.date_of_birth, position = req.body.position, number = req.body.number, teamId = req.body.teamId;

// 		connection.query('INSERT INTO player (first_name, last_name, date_of_birth, position, number, teamId) VALUES (?, ?, ?, ?, ?, ?)', 
// 			[first_name, last_name, date_of_birth, position, number, teamId], 
// 			function(err, result) {
// 		  		if (err) { res.status(400).send(err); return; }
//                   {
// 					if (result.affectedRows != 0) {
// 						response.push({'result' : 'success'});
// 					} else {
// 						response.push({'msg' : 'No Result Found'});
// 					}

// 					res.setHeader('Content-Type', 'application/json');
// 			    	res.status(200).send(JSON.stringify(response));
// 		  		} 
// 			});

// 	} else {
// 		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
// 		res.setHeader('Content-Type', 'application/json');
//     	res.status(200).send(JSON.stringify(response));
// 	}
// });

// Endpoint: http://localhost:3000/api/player/{:player id} search a particular player id
app.get('/api/player/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('SELECT * from player where id = ?', [id], function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Endpoint: http://localhost:3000/api/player search all player
app.get('/api/player', function (req,res) {
	console.log(req);
 
	connection.query(qAllPlayers, function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

//game related Endpoints below
//Endpoint: http://localhost:3000/api/game/add add new
app.post('/api/game/add', function (req,res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' && 		
        typeof req.body.leagueId !== 'undefined' 
	) {
		var name = req.body.name, leagueId = req.body.leagueId;

		connection.query('INSERT INTO team (name, leagueId) VALUES (?, ?)', 
			[name, leagueId], 
			function(err, result) {
		  		if (err) { res.status(400).send(err); return; }
                  {
					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} 
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

//statType related Endpoints below
//Endpoint: http://localhost:3000/api/statType/add add new
app.post('/api/statType/add', function (req,res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' && 		
        typeof req.body.sport !== 'undefined' 
	) {
		var name = req.body.name, sport = req.body.sport;

		connection.query('INSERT INTO statType (name, sport) VALUES (?, ?)', 
			[name, sport], 
			function(err, result) {
		  		if (err) { res.status(400).send(err); return; }
                  {
					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} 
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

// Endpoint: http://localhost:3000/api/statType/{:statType id} search a particular statType id
app.get('/api/statType/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('SELECT * from statType where id = ?', [id], function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Endpoint: http://localhost:3000/api/statType/{:statType id} search all statType
app.get('/api/statType', function (req,res) {
	console.log(req);
 
	connection.query('SELECT * from statType', function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// statEvent related Endpoints below
//Endpoint: http://127.0.0.1:5000/api/statEvent/add add new
app.post('/api/statEvent/add', function (req,res) {
	var response = [];

	if (
		typeof req.body.statTypeId !== 'undefined' && 
		typeof req.body.value !== 'undefined' && 
        typeof req.body.teamId !== 'undefined' && 
		typeof req.body.playerId !== 'undefined' &&
		typeof req.body.gameId !== 'undefined'
	) {
		var statTypeId = req.body.statTypeId, value = req.body.value, teamId = req.body.teamId, playerId = req.body.playerId, gameId = req.body.gameId;

		connection.query('INSERT INTO statEvent (statTypeId, value, teamId, playerId, gameId) VALUES (?, ?, ?, ?, ?)', 
			[statTypeId, value, teamId, playerId, gameId], 
			function(err, result) {
		  		if (err) { res.status(400).send(err); return; }
                  {
					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} 
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

// Endpoint: http://127.0.0.1:5000/api/statEvent/{:statEvent id} search a particular statEvent id
app.get('/api/statEvent/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('SELECT * from statEvent where id = ?', [id], function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Endpoint: http://127.0.0.1:5000/api/statEvent/{:statEvent id} search all statEvent
app.get('/api/statEvent', function (req,res) {
	console.log(req);
 
	connection.query('SELECT * from statEvent', function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Endpoint: http://127.0.0.1:5000/api/statEvent/edit/{:statEvent id} edit a particular id
app.post('/api/statevent/edit/:id', function (req,res) {
	var id = req.params.id, response = [];
 
	if (
		typeof req.body.statTypeId !== 'undefined' && 
		typeof req.body.value !== 'undefined' && 
		typeof req.body.teamId !== 'undefined' && 
		typeof req.body.playerId !== 'undefined'
	) {
		var statTypeId = req.body.statTypeId, value = req.body.value, teamId = req.body.teamId, playerId = req.body.playerId;
 
		connection.query('UPDATE statEvent SET statTypeId = ?, value = ?, teamId = ?, playerId = ? WHERE id = ?', 
			[statTypeId, value, teamId, playerId, id], 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required information'});
		res.setHeader('Content-Type', 'application/json');
    	res.send(200, JSON.stringify(response));
	}
});

// Endpoint: http://127.0.0.1:5000/api/statEvent/delete/{:statEvent id} delete a particular id
app.delete('/api/statevent/delete/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('DELETE FROM statEvent WHERE id = ?', [id], function(err, result) {
  		if (!err){
  			var response = [];
 
			if (result.affectedRows != 0) {
				response.push({'result' : 'success'});
			} else {
				response.push({'msg' : 'No Result Found'});
			}
 
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});
 
// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
 