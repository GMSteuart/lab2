var express = require('express');

// Api Reference - https://github.com/expressjs/cookies
var Cookies = require( "cookies" );

// Api Reference - https://github.com/expressjs/body-parser
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Api Reference - https://github.com/felixge/node-mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port     : '8889',
    database : 'adventure'
});
connection.connect();

var app = express();

/**
 * Base Route
 *
 * Checks if a user is logged in, if not redirect to log in
 */
app.get('/', function(req, res){
    var cookies = new Cookies(req, res);
    if(cookies.get("user_id") == undefined) {
        res.redirect('/users/login');
    } else {
        res.status(200);
        res.sendFile(__dirname + "/index.html");
    }
});

/**
 * Users Routes
 *
 * get - returns a json array of user data based on cookie
 * get login - returns login page
 * post login - logs user in and sets cookies based on post data
 * get register - returns register page
 * post register - adds a user to the database
 */
app.get('/users', function(req, res){
    // check user cookie
    var cookies = new Cookies(req, res);
    if(cookies.get('user_id')) {
        var query = "SELECT `location_id` FROM `users` WHERE `id` = " + cookies.get('user_id');
        connection.query(query, function(err, user) {
            if (err) {
                console.error('Error: ' + err.stack);
                return;
            } else {
                // get items as well
                res.set({'Content-Type': 'application/json'});
                res.status(200);
                //console.log(user[0]);
                res.send(user[0]);
            }
        });
    } else {
        return;
    }
    // if logged in get user data and items
});
app.get('/users/login', function(req, res){
    res.status(200);
    res.sendFile(__dirname + "/login.html");
});
app.post('/users/login', urlencodedParser, function(req, res){
    // check post data for user in the database
    var query = "SELECT `id`, `username`  FROM `users` WHERE " +
        "`username` = '" + req.body.username + "' AND " +
        "`password` = '" + req.body.password + "'";

    connection.query(query, function(err, user) {
        if (err) {
            console.error('Error: ' + err.stack);
            return;
        } else {
            // if in database set cookies and send to base route
            if(user[0]) {
                var cookies = new Cookies(req, res);
                cookies.set('user_id', user[0]['id']);
                cookies.set('username', user[0]['username']);
                res.redirect('/');

            // otherwise back to login
            } else {
                res.redirect('/users/login');
            }
        }
    });
});
app.get('/users/register', function(req, res){
    res.status(200);
    res.sendFile(__dirname + "/register.html");
});
app.post('/users/register', urlencodedParser, function(req, res){
    // check post data isnt empty
    // add user to database and redirect to login page
});
app.get('/users/logout', function(req, res){
    // destroy cookies
    var cookies = new Cookies(req, res);
    cookies.set('user_id', undefined);
    cookies.set('username', undefined);
    // redirect to login page
    res.redirect('/users/login');
});

/**
 * Location Routes
 *
 * get - returns a locations information based off id
 * post - updates the users last location
 * put - use an item at the desired location
 */
app.get('/location/:id', function(req, res){
    // fetch database for location
    // return in json array
});
app.post('/location/:id', function(req, res){
    // update user based on cookie
});
app.put('/location/:id', function(req, res){
    // remove item from users_items
    // check for special event
    // update users location if so
});

/**
 * Image Routes
 */
app.get('/img/:name', function(req, res){
    res.status(200);
    res.sendFile(__dirname + "/" + req.params.name);
});





app.get('/:id', function(req, res){
	if (req.params.id == "inventory") {
	    res.set({'Content-Type': 'application/json'});
	    res.status(200);
	    res.send(inventory);
	    return;
	}
	for (var i in campus) {
		if (req.params.id == campus[i].id) {
		    res.set({'Content-Type': 'application/json'});
		    res.status(200);
		    res.send(campus[i]);
		    return;
		}
	}
	res.status(404);
	res.send("not found, sorry");
});

app.delete('/:id/:item', function(req, res){
	for (var i in campus) {
		if (req.params.id == campus[i].id) {
		    res.set({'Content-Type': 'application/json'});
		    var ix = -1;
		    if (campus[i].what != undefined) {
					ix = campus[i].what.indexOf(req.params.item);
		    }
		    if (ix >= 0) {
		       res.status(200);
			inventory.push(campus[i].what[ix]); // stash
		        res.send(inventory);
			campus[i].what.splice(ix, 1); // room no longer has this
			return;
		    }
		    res.status(200);
		    res.send([]);
		    return;
		}
	}
	res.status(404);
	res.send("location not found");
});

app.put('/:id/:item', function(req, res){
	for (var i in campus) {
		if (req.params.id == campus[i].id) {
				// Check you have this
				var ix = inventory.indexOf(req.params.item)
				if (ix >= 0) {
					dropbox(ix,campus[i]);
					res.set({'Content-Type': 'application/json'});
					res.status(200);
					res.send([]);
				} else {
					res.status(404);
					res.send("you do not have this");
				}
				return;
		}
	}
	res.status(404);
	res.send("location not found");
});

app.listen(3000);

var dropbox = function(ix,room) {
	var item = inventory[ix];
	inventory.splice(ix, 1);	 // remove from inventory
	if (room.id == 'allen-fieldhouse' && item == "basketball") {
		room.text	+= " Someone found the ball so there is a game going on!"
		return;
	}
	if (room.what == undefined) {
		room.what = [];
	}
	room.what.push(item);
}

