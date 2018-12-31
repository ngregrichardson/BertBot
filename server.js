
const express = require('express');
const app = express();

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

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
