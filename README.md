Microservice
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

Returns:
```json
["john@example.com"]
```
