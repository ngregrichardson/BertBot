const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Poll extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      group: 'polls',
      memberName: 'poll',
      description: 'Creates a new yes/no/maybe poll in the channel. **R**',
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [{
        key: 'question',
        prompt: 'What would you like the poll to be about?',
        type: 'string'
      }]
    });
  }
  hasPermission(message) {
    if(config.restrictedCommandRoles) return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }
  async run(message, args) {
    message.channel.send('**' + args.question + '**').then(function(message) {
      message.react("👍");
      message.react("🤷");
      message.react("👎");
    }).catch(function(error) {
      console.log(error);
    });
    message.delete();
  }
}
module.exports = Poll;
