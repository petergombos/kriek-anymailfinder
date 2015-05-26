Microservice
============

Version 0.1.0

Do one thing and do it well

## Endpoints:

### GET /
Information about the microservice

```js
{
	name: pkg.name,
	version: pkg.version,
	description: pkg.description,
	repository: pkg.repository.url 
}
```

### POST /
Do something awesome

Parameters you'll need to pass in the request object:

```json
{
	"foo" : "bar"
}
```

Returns:
```json
{
	"success" : true
}
```

## Dev

To start the dev server:
```bash
grunt server
```
It will watch your files and it will restart the server when they change

## Deploy

1. Remote repo
```bash
git remote add dokku dokku@dokku.kriek.io:[app_namespace]
```

2. Adding persistent data volume (on the server over SSH) [optional]
```bash
dokku volume:create volume_name /home/dokku/.datastore/volume:/app/data
dokku volume:link app_namespace volume_name
```
