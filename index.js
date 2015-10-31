var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
var emailFinder = require('email-finder');
var crypto = require('crypto');


function sha1(string){
	var shasum = crypto.createHash('sha1');
	shasum.update(string);
	return shasum.digest('hex');
}


// CORS support for cross domain ajax calls and json request body parsing
app.use(cors(), bodyParser.json(), function(err,req,res,next){
	res.status(400).send({error: "Invalid JSON in request body"});
});

app.use('/',express.static('public'));


var jobs = [];


function job(jobId){
	return {
		id : jobId,
		status : 'pending',
		created_time : new Date()
	}
}

app.post('/api',function(req,res){
	
	var options = {
		fqdn : "kriekapps.com",
		from_email : "info@kriekapps.com",
		timeout : 15000,
		debug : true
	}

	var jobId = sha1(req.body.name+req.body.domain);
	
	if(jobs[jobId] && jobs[jobId].response.code !== 704){

		res.send(jobs[jobId]);

	} else {
		
		jobs[jobId] = job(jobId);
		res.send(jobs[jobId]);

		emailFinder(req.body.name,req.body.domain,options,function(err, validAddresses){
			
			jobs[jobId].status = 'complete';
			jobs[jobId].resolved_time = new Date();

			if(err){
				jobs[jobId].response = err;
			} else {
				jobs[jobId].response = validAddresses;
			}

		});
		
	}

})


app.get('/api/:id', function(req,res){
	if(jobs[req.params.id]){
		return res.send(jobs[req.params.id]);
	} 
	
	res.send({status : "error", message : "No job found for this ID."});
});

// Starting the app on port 5000
app.listen(5000, function() {
	console.log('running');
});