var mongoose = require('mongoose');
var credentials = require('../credentials.js');

module.exports = function(app) {
	switch (app.get('env')) {
		case 'development':
			mongoose.connect(credentials.dev.mongo.connectionString, {
				server: {
					socketOptions: {
						keepAlive: 1
					}
				}
			});
			break;
		default:
			throw new Error('Unknown execution environment: ' + app.get('env'));
	}
};
