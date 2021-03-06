var request = require('request');
var async = require('async');
var credentials = require('../credentials.js');
var User = require('../models/user.js');

var googleImageCrawle = require('../services/google-image-crawle.js');

module.exports = function(app, stormpath) {
	// admin credentials
	// curl --user 36215HUDX6VDZ786CTXM1NIOX:70WULuMTznL1iXVGZX8UMJycU9Xat/3Q7H4U5ZZJ4Dg --data 'grant_type=client_credentials' http://localhost:3000/oauth/token
	// app.use('/api', stormpath.apiAuthenticationRequired);

	app.get('/api/users', function(req, res) {
		var client = req.app.get('stormpathClient');
		client.getCurrentTenant(function (err, tenant) {
			if (err) {
				return res.status(400).json(err);
			}

			return res.json(tenant);
		});
		// res.send({message: 'A lot of users eh'});
	});

	app.get('/api/user', function (req, res) {
		res.send(req.user);
	});

	app.get('/api/crawle-google-image/:key', function (req, res) {
		googleImageCrawle(req.params.key).then(function(response) {
			res.json(response);
		});
	});
	// app.get('/api')


};