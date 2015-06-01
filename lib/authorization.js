var request = require("request");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var atob = require("atob");
var Promise = require("promise");

/**
 * Promise to get the public keys of supported issuers. Currently gets them from a simple cantrip dataStore
 */
var getKeys = new Promise(function(resolve, reject) {
	request.get("http://cantrip.kriek.io/rs256", function(err, res, keys) {
		if (err) {
			return reject(err);
		}
		try {
			keys = JSON.parse(keys);
		} catch(err) {
			return reject(err);
		}
		resolve(keys);
	});
});

/**
 * Factory function to set up a middleware function. After this, the request object will have an authorization property
 * @return {Function} middleware
 */
module.exports = function() {
	return function(req, res, next) {
		getKeys.then(function(keys) {
			req.authorization = {
				token: null,
				verified: false,
				data: null
			};

			var token = req.headers.authorization;
			if (!token) {
				return next();
			}

			token = token.replace("Bearer ", "");

			req.authorization.token = token;

			var data;
			try {
				data = JSON.parse(atob(token.split(".")[1]));
			} catch(err){
				return next();
			}

			req.authorization.data = data;

			var obj = _.find(keys, function(key) {
				return key._id === data.iss
			});

			if (!obj) {
				return next();
			}

			var key = obj.key;
			jwt.verify(token, key, { algorithms: ['RS256'] }, function(err, decoded) {
				if (err) {
					console.log(err);
					return next();
				}
				req.authorization.verified = true;
				next();
			});
		});
	}
}