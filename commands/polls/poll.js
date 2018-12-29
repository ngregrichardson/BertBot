const commando = require('discord.js-commando');
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
    return message.member.roles.some(r => ["admin", "mentor", "leader"].includes(r.name));
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
