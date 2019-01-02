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
        key: 'day',
        prompt: 'Day of the meeting',
        type: 'string'
      },
      {
        key: 'month',
        prompt: 'Month of the meeting',
        type: 'string',
        default: ''
      },
      {
        key: 'time',
        prompt: 'Time of the meeting',
        type: 'string',
        default: ''
      }]
    });
  }
  hasPermission(message) {
    return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }

  async run(message, { action, day, month, time }) {
    if(action == 'add') {
      var date = moment([ moment.year(), month, day, time.split(':')[0], time.split(':')[1]]);
      fs.
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
