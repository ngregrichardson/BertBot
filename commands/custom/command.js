const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

var file1 = "const commando = require('discord.js-commando'); class ";
var file2 = " extends commando.Command { constructor(client) { super(client, { name: '";
var file3 = "', group: 'custom', memberName: '";
var file4 = "', description: '";
var file5 = "' }); } async run(message, args) { message.channel.send('";
var file6 = "'); } } module.exports = ";
var file7 = ";";

class Command extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'command',
      group: 'custom',
      memberName: 'command',
      description: 'Creates a custom command **R**',
      args: [{
        key: 'name',
        prompt: 'Name of the command',
        type: 'string'
      },
      {
        key: 'description',
        prompt: 'Description of the command',
        type: 'string'
      },
      {
        key: 'response',
        prompt: 'The response the bot will give',
        type: 'string'
      }]
    });
  }
  hasPermission(message) {
    return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }

  async run(message, { name, description, response }) {
    console.log(name);
    console.log(description);
    console.log(response);
    var data = file1 + capitalize(name) + file2 + name + file3 + name + file4 + description + file5 + response + file6 + capitalize(name) + file7;
    console.log(data);
    fs.writeFile('commands/custom/' + name + '.js', data, function(err) {
      if(err) {
        console.log(err);
      }
    });
    refresh();
  }
}
module.exports = Command;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function refresh() {
  process.exit(1);
}
