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
                query = "SELECT `users_items`.*, `items`.`name` " +
                "FROM users_items " +
                "LEFT JOIN items ON users_items.item_id = items.id " +
                "WHERE users_items.user_id = " + cookies.get('user_id');

                connection.query(query, function(err, items) {
                    if (err) {
                        console.error('Error: ' + err.stack);
                        return;
                    } else {
                        res.set({'Content-Type': 'application/json'});
                        res.status(200);
                        user[0]['items'] = items;
                        res.send(user[0]);
                    }
                });
            }
        });
    } else {
        return;
    }
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
    // add user to database and redirect to login page
    var query = "INSERT INTO `adventure`.`users` " +
        "(`id`, `username`, `password`, `location_id`, `updated`, `secret`) " +
        "VALUES (NULL, '" + req.body.username + "', '" + req.body.password + "', '', '', '');";

    connection.query(query, function(err, user) {
        if (err) {
            console.error('Error: ' + err.stack);
            return;
        } else {
            if(user.affectedRows) {
                // add items around the map and player invenotry
                query = "SELECT * FROM `items`";
                connection.query(query, function(err, items){
                    if(err) {
                        console.error('Error: ' + err.stack);
                        return;
                    } else {
                        for(var i in items) {
                            query = "INSERT INTO `adventure`.`users_items` " +
                            "(`id`, `user_id`, `item_id`, `location_id`) " +
                            "VALUES (NULL, '" + user.insertId + "', '"
                            + items[i]['id'] + "', '" + items[i]['default_location_id'] + "');";
                            connection.query(query, function(err, item) {
                                if (err) {
                                    console.error('Error: ' + err.stack);
                                    return;
                                }
                            });
                        }
                        res.redirect('/');
                    }
                });
            }
        }
    });
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
 * delete - pick up an item from a location
 */
app.get('/location/:id', function(req, res){
    // fetch database for location and related item
    var query = "SELECT `locations`.* " +
        "FROM `locations` " +
        "WHERE `locations`.`id` = " + req.params.id;

    connection.query(query, function(err, location) {
        if (err) {
            console.error('Error: ' + err.stack);
            return;
        } else {
            res.set({'Content-Type': 'application/json'});
            res.status(200);
            res.send(location[0]);
        }
    });
});
app.post('/location/:id', function(req, res){
    // update user based on cookie
    var cookies = new Cookies(req, res);
    var query = "UPDATE `adventure`.`users` " +
        "SET `location_id` = '" + req.params.id + "' " +
        "WHERE `users`.`id` = " + cookies.get('user_id');

    connection.query(query, function(err, location) {
        if (err) {
            console.error('Error: ' + err.stack);
            return;
        } else {
            // if in database return json array
            if(location.affectedRows) {
                res.status(200);
            } else {
                return;
            }
        }
    });
});

/**
 * Image Routes
 */
app.get('/img/:name', function(req, res){
    res.status(200);
    res.sendFile(__dirname + "/img/" + req.params.name);
});

/**
 * Inventory Routes
 *
 * put - update inventory item to location
 * delete - update inventory item to 0 (in pocket)
 */
app.put('/inventory/:user_item_id/:location_id', function(req, res){
    // update user based on cookie
    var cookies = new Cookies(req, res);
    var query = "UPDATE `adventure`.`users_items` " +
        "SET `location_id` = '" + req.params.location_id + "' " +
        "WHERE `users_items`.`id` = " + req.params.user_item_id + " " +
        "AND `users_items`.`user_id` = " + cookies.get('user_id');

    connection.query(query, function(err, location) {
        if (err) {
            console.error('Error: ' + err.stack);
            return;
        } else {
            res.status(200);
        }
    });
});
app.delete('/inventory/:user_item_id', function(req, res){
    // update user based on cookie
    var cookies = new Cookies(req, res);
    var query = "UPDATE `adventure`.`users_items` " +
        "SET `location_id` = 0 " +
        "WHERE `users_items`.`id` = " + req.params.user_item_id + " " +
        "AND `users_items`.`user_id` = " + cookies.get('user_id');

    connection.query(query, function(err, location) {
        if (err) {
            console.error('Error: ' + err.stack);
            return;
        } else {
            res.status(200);
        }
    });
});

app.listen(3000);