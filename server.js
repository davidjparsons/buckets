// Basic Setup
var http     = require('http'),
	express  = require('express'),
	mysql    = require('mysql')
	parser   = require('body-parser');
    require('dotenv').config()
 
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
 
// Set default route
app.get('/api', function (req, res) {
	res.send('<html><body><p>Welcome to sShop App</p></body></html>');
});

//Endpoint: http://127.0.0.1:5000/product/add
app.post('/api/statEvent/add', function (req,res) {
	var response = [];

	if (
		typeof req.body.statTypeId !== 'undefined' && 
		typeof req.body.value !== 'undefined' && 
        typeof req.body.teamId !== 'undefined' && 
		typeof req.body.playerId !== 'undefined'
	) {
		var name = req.body.name, price = req.body.price, imageUrl = req.body.imageUrl;

		connection.query('INSERT INTO statEvent (statTypeId, value, teamId, playerId) VALUES (?, ?, ?)', 
			[name, price, imageUrl], 
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

// Endpoint: http://127.0.0.1:5000/product/{:product id}
app.get('/api/product/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('SELECT * from nd_products where id = ?', [id], function(err, rows, fields) {
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

// Endpoint: http://127.0.0.1:5000/product/edit/{:product id}
app.post('/api/product/edit/:id', function (req,res) {
	var id = req.params.id, response = [];
 
	if (
		typeof req.body.name !== 'undefined' && 
		typeof req.body.price !== 'undefined' && 
		typeof req.body.imageUrl !== 'undefined'
	) {
		var name = req.body.name, price = req.body.price, imageUrl = req.body.imageUrl;
 
		connection.query('UPDATE nd_products SET product_name = ?, product_price = ?, product_image = ? WHERE id = ?', 
			[name, price, imageUrl, id], 
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

// Endpoint: http://127.0.0.1:5000/product/delete/{:product id}
app.delete('/api/product/delete/:id', function (req,res) {
	var id = req.params.id;
 
	connection.query('DELETE FROM nd_products WHERE id = ?', [id], function(err, result) {
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
 