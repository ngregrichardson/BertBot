const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));
const meetings = JSON.parse(fs.readFileSync('commands/meetings/meetings.json'));
const moment = require('moment');
const formatJSON = require('json-format');

class Meeting extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'meeting',
      group: 'custom',
      memberName: 'meeting',
      description: 'Creates a custom command **R**',
      args: [{
        key: 'action',
        prompt: 'Add, edit, or delete a meeting.',
        type: 'string'
      },
      {
        key: 'description',
        prompt: 'Description of the meeting',
        type: 'string'
      },
      {
        key: 'day',
        prompt: 'Day of the meeting',
        type: 'string'
      },
      {
        key: 'month',
        prompt: 'Month of the meeting',
        type: 'string'
      },
      {
        key: 'time',
        prompt: 'Time of the meeting',
        type: 'string'
      }]
    });
  }
  hasPermission(message) {
    return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }

  async run(message, { action, description, day, month, time }) {
    if(action == 'add') {
      var date = moment([ moment.year(), parseInt(month), parseInt(day), parseInt(time.split(':')[0]), parseInt(time.split(':')[1])]).format("dddd, MMMM ");
      meetings.meetings.push([description, date]);
    }
  }
}
module.exports = Meeting;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function refresh() {
  process.exit();
}
