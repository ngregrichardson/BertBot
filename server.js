/* App setup */
const express = require('express');
const app = express();

/* Database setup */
const _ = require('underscore');
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)
const fs = require('fs');
const bodyParser = require('body-parser');

/* App configuration */
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'));

/* Database configuration */
db.defaults({
  config: {},
  commands: {},
  likes: {},
  meetings: {},
  count: 0
}).write();

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/ui/index.html');
});

app.get('/config', function (request, response) {
  response.send(JSON.parse(_.keys(db.get('config').value())[0]));
});

app.post("/config", function (request, response) {
  db.set('config', request.body).write();
  response.sendStatus(200);
});

app.get('/settings', function (request, response) {
  response.sendFile(__dirname + '/ui/settings.js');
});

app.get('/meetings', function (request, response) {
  response.send(JSON.parse(db.get('meetings').value()));
});

app.post('/meetings', function (request, response) {
  db.set('meetings', _.keys(request.body)[0]).write();
  response.sendStatus(200);
});

app.get('/meetingsui', function (request, response) {
  response.sendFile(__dirname + '/ui/meetings.html');
});

app.get('/meetingsjs', function (request, response) {
  response.sendFile(__dirname + '/ui/meetings.js');
});

app.get('/styles', function (request, response) {
  response.sendFile(__dirname + '/ui/styles.css');
});

app.post("/restart", function (request, response) {
  response.sendFile(__dirname + '/reload/reload.html');
  setTimeout(function () {
    process.exit();
  }, 1000);
});

const listener = app.listen(process.env.PORT, function () {

});

function checkForMeetings() {
  if (Object.getOwnPropertyNames(JSON.parse(_.keys(db.get('meetings').value())[0])).length == 0) {
    return {};
  } else {
    return JSON.parse(_.keys(db.get('meetings').value())[0]);
  }
}

module.exports = {
  config: JSON.parse(_.keys(db.get('config').value())[0]),
  meetings: JSON.parse(db.get('meetings').value()),
  db: db
};