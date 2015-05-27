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

1. To start the dev server:
```sh
grunt server
```
It will watch your files and it will restart the server when they change

## Deploy

### Push to deploy setup
```sh
git remote add dokku dokku@dokku.kriek.io:<app>
git push dokku master
```
To have a custom system env, just put a Dockerfile into the project root and you are ready to go. Up on push deploy, your newly created docker image will be used as a base for your app. 
(An example of this file can be found in the root) 

### Adding persistent data volume (server side) [optional]
```sh
dokku volume:create <volume> /home/dokku/.datastore/volume:/app/data
dokku volume:link <app> <volume>
```

### Adding mondogdb to the app (server side) [optional]
Create a MongoDB database
```sh
dokku mongodb:create <db>
-----> MongoDB database created: <db>
```
Link database to app
```sh
dokku mongodb:link <app> <db>
{
	"user" : "<app>",
	"pwd" : "aef1b375b32fb4f2b5d25ff0cff5d57a",
	"roles" : [
		"readWrite"
	],
	"_id" : ObjectId("55658dad69058f162be7e28a")
}
```
To access the db use the ENV var "MONGODB_URL" or via dokku config:
```sh
dokku config <app>
=== <app> config vars ===
MONGODB_URL:  mongodb://<app>:EsPUFKfjI8ORkev6@mongodb:27017/<db>
```