var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'site'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/site'));
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/getting-started.html', function (req, res) {
  res.render('getting-started');
});

app.get('/docs.html', function (req, res) {
  res.render('docs');
});

app.get('/blog.html', function (req, res) {
  res.render('blog');
});

app.get('/examples.html', function (req, res) {
  res.render('examples');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});