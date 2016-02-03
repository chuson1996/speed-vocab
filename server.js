var path = require('path');
var express = require('express');
var stormpath = require('express-stormpath');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var credentials = require('./credentials.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


app.use(stormpath.init(app, {
	website: true,
	expand: {
		groupMemberships: true,
		apiKeys: true
	},
	client: {
		apiKey: {
			id: credentials.dev.stormpath.client_apikey_id,
			secret: credentials.dev.stormpath.client_apikey_secret
		}
	},
	application: {
		href: credentials.dev.stormpath.application_href
	},
	debug: 'info, error'
}));
require('./api/index.js')(app, stormpath);
require('./database/mongolab.js')(app);
require('./socket/test.js')(io);
require('./routes/config.js')(app, stormpath);

app.on('stormpath.ready', function() {
	server.listen(process.env.PORT, function() {
		// console.log(process.env);
		console.log('Ready!');
	});
});
