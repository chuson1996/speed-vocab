var path = require('path');
var express = require('express');
var stormpath = require('express-stormpath');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

require('./api/index.js')(app, stormpath);
require('./database/mongolab.js')(app);
require('./socket/test.js')(io);
require('./routes/user.js')(app);

app.on('stormpath.ready', function() {
	server.listen(3000, function() {
		console.log('Ready!');
	});
});
