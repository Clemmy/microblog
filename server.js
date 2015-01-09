// modules =================================================
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
app.use(cors());

// configuration ===========================================
var port = process.env.PORT || 10000;

var db = require('./config/db');
mongoose.connect(db.url);
var connection = mongoose.connection;
connection.on('error', function (err) {
    console.log('Connection error: Could not establish connection to MongoDB.', err);
});
connection.once('open', function () {
    console.log('Connected to MongoDB.');
});

require('./models/Blog');
require('./models/Post');

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/client'));

// routes ==================================================
require('./app/routes')(app); // configure our api routes

// start app ===============================================
app.listen(port);
console.log('Running on port ' + port);
exports = module.exports = app;
