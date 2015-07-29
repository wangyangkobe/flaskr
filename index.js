var express = require('express');
var path = require('path');
var db = require('monk')('localhost/flaskr');

var app = express();
var pics = db.get('pics');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
	pics.find({}, function(err, doc){
		res.render('index', {imageUrls: doc});
	});

});
var server = app.listen(1337, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});