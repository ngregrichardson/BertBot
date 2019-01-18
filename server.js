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
  config: { '{"botName":"BertBot","teamNumber":"4750","discordServerId":"529060705589002260","trelloNotificationsOn":false,"trelloNotificationChannelId":"","trelloPollInterval":"","watchedTrelloBoardIds":"","enabledTrelloNotifications":"","trelloPrefix":"","orderRequestEmailSystemOn":false,"orderRequestBoardId":"","orderPlacedChecklistItemName":"","orderPlacedListName":"","orderRequestedListName":"","swearFilterOn":false,"swearFilterWhitelistedChannelNames":"","modOn":false,"modCommandRoles":["owner"],"meetingNotificationsOn":false,"meetingNotificationChannelId":"","likeCounterOn":false,"blaiseWhitelistedChannelNames":[""],"restrictedCommandRoles":["owner","leader"],"userIDs":{},"contentString":""}': '' },
  commands: {},
  likes: {},
  meetings: '{}',
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
  fs.writeFile(__dirname + '/ui/savedConfig.json', _.keys(db.get('config').value())[0], (err) => {
    if (err) console.log(err);
  });
  response.sendStatus(200);
});

app.get('/settings', function (request, response) {
  response.sendFile(__dirname + '/ui/settings.js');
});

app.get('/download', function (request, response) {
  response.download(__dirname + '/ui/savedConfig.json', 'savedConfig.json');
});

app.post('/download', function (request, response) {
  response.attachment(__dirname + '/ui/savedConfig.json');
  response.sendStatus(200);
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
  process.exit();
});

const listener = app.listen(process.env.PORT, function () {

});

module.exports = {
  config: JSON.parse(_.keys(db.get('config').value())[0]),
  meetings: JSON.parse(db.get('meetings').value()),
  db: db
};
