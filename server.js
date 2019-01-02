
const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/ui/index.html');
});

app.get('/config', function(request, response) {
  response.sendFile(__dirname + '/configuration.json');
});

app.get('/settings', function(request, response) {
  response.sendFile(__dirname + '/ui/settings.js');
});

app.get('/styles', function(request, response) {
  response.sendFile(__dirname + '/ui/styles.css');
});

app.post("/save", function (request, response) {
  var data;
  for(var i in request.body) {
    data = i;
  }
  fs.writeFile('configuration.json', data, function(err) {
    if(err) {
     response.redirect();
    }
    response.redirect("/");
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
