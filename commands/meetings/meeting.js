const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));
const moment = require('moment');

var file1 = "const commando = require('discord.js-commando'); class ";
var file2 = " extends commando.Command { constructor(client) { super(client, { name: '";
var file3 = "', group: 'custom', memberName: '";
var file4 = "', description: '";
var file5 = "' }); } async run(message, args) { message.channel.send('";
var file6 = "'); } } module.exports = ";
var file7 = ";";

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
        key: 'name',
        prompt: 'Name of the meeting',
        type: 'string'
      },
      {
        key: 'description',
        prompt: 'Description of the command',
        type: 'string',
        default: ''
      },
      {
        key: 'response',
        prompt: 'The response the bot will give',
        type: 'string',
        default: ''
      }]
    });
  }
  hasPermission(message) {
    return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }

  async run(message, { action, name, description, response }) {
    if(action == 'add') {
      var data = file1 + capitalize(name) + file2 + name + file3 + name + file4 + description + file5 + response + file6 + capitalize(name) + file7;
      fs.writeFile('commands/custom/' + name + '.js', data, function(err) {
        if(err) {
         console.log(err); 
        }
        refresh();
    });
    }else if(action == 'remove') {
      fs.unlink('commands/custom/' + name + '.js', function(err) {
        if(err) {
         console.log(err);
        }
        refresh();
      });
    }else {
      message.channel.send('You must specify `add` or `remove` for this command.');
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
