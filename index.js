var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
var fs = require("fs");
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var authorization = require("./lib/authorization.js");

// CORS support for cross domain ajax calls and json request body parsing
app.use(cors(), bodyParser.json(), function(err,req,res,next){
	res.status(400).send({error: "Invalid JSON in request body"});
},authorization());

// Basic info about this service
app.get("/", function(req, res) {
	res.send({
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
		repository: pkg.repository.url
	});
});

// To all other requests
app.all("*", function(req, res, next) {
	res.status(404).send({ error : "Endpoint not found"});
});

// Starting the app on port 5000
app.listen(5000, function() {
	console.log({
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
		repository: pkg.repository.url
	});
});

