const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var meetings;
var id
$.get('/meetings', function (sentMeetings) {
  meetings = sentMeetings;
  if (meetings != undefined) {
    setup();
  } else {
    error('Sorry, the configuration could not be loaded. Please reload the page and try again.');
  }
});
var table = $('#meetings');
var saveButton = $('input[value="Save"]');
var errorSpace = $('#error');

function setup() {
  var html = '<br>';
  id = 0;
  for (var meeting in meetings) {
    var minutes;
    if (meetings[meeting].minutes.toString().length == 1) {
      minutes = '0' + meetings[meeting].minutes;
    } else {
      minutes = meetings[meeting].minutes;
    }
    html += '<div class="meeting" id="' + id + '">Description: <input id="description" type="text" value="' + meetings[meeting].description + '" onchange="changed()"><br>Day: <input id="date" type="number" value="' + meetings[meeting].date + '" onchange="changed()"><br>Month: <input id="month" type="text" value="' + months[meetings[meeting].months] + '" onchange="changed()"><br>Time: <input id="time" type="text" value="' + meetings[meeting].hours + ':' + minutes + '" onchange="changed()"><br><input type="image" src="https://img.icons8.com/metro/1600/delete.png" onclick="remove(this)"></div><br>';
    id++;
  }
  table.html(html);
}

function add() {
  id++;
  table.html(table.html() + '<div class="meeting" id="' + id + '">Description: <input id="description" type="text" value="" onchange="changed()"><br>Day: <input id="date" type="number" value="" onchange="changed()"><br>Month: <input id="month" type="text" value="" onchange="changed()"><br>Time: <input id="time" type="text" value="" onchange="changed()"><br><input type="image" src="https://img.icons8.com/metro/1600/delete.png" onclick="remove(this)"></div><br>');
  changed();
}

function remove(deleteButton) {
  var meeting = deleteButton.parentNode;
  if (!confirm("Are you sure you want to delete that?")) return;
  delete meetings[parseInt(meeting.id)];
  meeting.parentNode.removeChild(meeting);
  changed();
}

function changed() {
  saveButton.css('color', 'red');
  saveButton.css('border-color', 'red');
}

function save() {
  $.post("/meetings", format(), function (data, status) {
    if (status == "200") {
      error('The configuration was saved. Restarting the bot.');
    }
  });
}

function format() {
  var data = {};
  var saving = document.getElementsByClassName('meeting');
  for (var i = 0; i < saving.length; i++) {
    var description = saving[i].querySelector("#description").value;
    var date = saving[i].querySelector("#date").value;
    var month = saving[i].querySelector("#month").value;
    var time = saving[i].querySelector("#time").value;
    data[date + '-' + month + '-' + time] = {
      years: new Date().getFullYear(),
      months: months.indexOf(month),
      date: parseInt(date),
      hours: parseInt(time.split(':')[0]),
      minutes: parseInt(time.split(':')[1]),
      seconds: 0,
      milliseconds: 0,
      description: description
    };
  }
  return JSON.stringify(data);
}

function restart() {
  $.post("/restart", "restart", function (data, status) {});
}

function error(error) {
  errorSpace.text(error);
}