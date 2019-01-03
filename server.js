const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

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

app.get('/meetings', function(request, response) {
  response.sendFile(__dirname + '/commands/meetings/meetings.json');
});

app.post("/restart", function(request, response) {
  response.sendFile(__dirname + '/reload/reload.html');
  setTimeout(()=>{
    process.exit();
  }, 1000)
  
});

app.post("/save", function (request, response) {
  var data;
  for(var i in request.body) {
    data = i;
  }
  fs.writeFile('configuration.json', data, function(err) {  
    if(err) {
      response.redirect("/");
    }else {
      response.redirect("/");
    }
  });
});

const listener = app.listen(process.env.PORT, function() {
  
});
