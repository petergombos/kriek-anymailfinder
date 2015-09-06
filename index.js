var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
var emailFinder = require('email-finder');


// CORS support for cross domain ajax calls and json request body parsing
app.use(cors(), bodyParser.json(), function(err,req,res,next){
	res.status(400).send({error: "Invalid JSON in request body"});
});

app.use('/',express.static('public'));

app.post('/api',function(req,res){
	emailFinder(req.body.name,req.body.domain,function(err, validAddresses){
		if(err){
			return res.send(err);
		}
		res.send(validAddresses);
	});
})


// Starting the app on port 5000
app.listen(5000, function() {
	console.log('running');
});