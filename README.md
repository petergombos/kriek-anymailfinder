AnymailFinder
============

Version 0.1.0

Guesses and validates email addresses for a given name on a given domain.

## Endpoints:

### POST /api

Parameters you'll need to pass in the request object:

```json
{
	"name" : "john doe",
	"domain" : "example.com"
}
```

Returns an object
```json
{
	"id" : "hashID",
	"status" : "pending",
	"created_time" : new Date()
}
```

### GET /api/:job_id

Get the results for a job.

Returns an object
```json
{
	"id" : "hashID",
	"status" : "complete",
	"createdTime" : "Time",
	"resolved_time" : "Time",
	"result" : ["john@example.com"]
}