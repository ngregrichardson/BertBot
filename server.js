
const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/config', function(request, response) {
  response.sendFile(__dirname + '/configuration.json');
});

app.get('/settings', function(request, response) {
  response.sendFile(__dirname + '/settings.js');
});

app.get('/styles', function(request, response) {
  response.sendFile(__dirname + '/styles.css');
});

app.post("/save", function (request, response) {
  console.log(request);
  //console.log(JSON.stringify(request.body));
  // fs.writeFile('configuration.json', JSON.stringify(request.body), function(err) {
  //   if(err) {
  //    console.log(err);
  //   }
  //   process.exit();
  //   response.redirect("/");
  // });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
