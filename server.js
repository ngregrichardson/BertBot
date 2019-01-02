const express = require('express');
const app = express();
const session = require('express-session');
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

app.post("/restart", function(request, response) {
  process.exit();
});

app.post("/save", function (request, response) {
  var data;
  for(var i in request.body) {
    data = i;
  }
  fs.writeFile('configuration.json', data, function(err) {
    //What you want to do is use a session variable
    //okay...thank you! I think I had looked at this before but overlooked it. thanks a bunch!
    //Glad I could help! Make sure to click the thank button! of course!
  
    if(err) {
     response.redirect("/");
    }
    response.redirect("/");
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
