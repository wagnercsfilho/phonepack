var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'site'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/site'));
app.use(express.static(__dirname + '/dist'));

require('./site/app/index')(app);

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});