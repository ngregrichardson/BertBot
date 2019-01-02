const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const bodyParser = require('body-parser');
var ssn;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret: 'XASDASDA' }));
app.use(express.static('public'));

app.get('/', function(request, response) {
  ssn = request.session;
  response.sendFile(__dirname + '/ui/index.html');
  response.render('/', { #error: 'Changes Saved!'});
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

app.post("/restart", function(request, response) {
  process.exit();
});

app.post("/save", function (request, response) {
  ssn = request.session;
  var data;
  for(var i in request.body) {
    data = i;
  }
  fs.writeFile('configuration.json', data, function(err) {  
    if(err) {
      ssn.error = err;
      response.redirect("/");
    }else {
      response.redirect("/"); 
    }
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
