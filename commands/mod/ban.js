/* Config */
const commando = require('discord.js-commando');
const config = require('/app/server.js').config;

class Ban extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'mod',
      memberName: 'ban',
      usage: 'ban <@username> *<"reason"> <days>*',
      description: 'Bans a member. **M**',
      args: [{
          key: 'member',
          prompt: 'The correct usage of `!ban` is `!ban **@username** "reason" days`',
          type: 'user'
        },
        {
          key: 'reason',
          prompt: 'The correct usage of `!ban` is `!ban @username "**reason**" days`',
          type: 'string',
          default: ''
        },
        {
          key: 'days',
          prompt: 'The correct usage of `!ban` is `!ban @username "reason" **days**`',
          type: 'integer',
          default: 0
        }
      ]
    });
  }
  hasPermission(message) {
    if (config.modCommandRoles) return message.member.roles.some(r => config.modCommandRoles.includes(r.name));
  }

  async run(message, {
    member,
    reason,
    days
  }) {
    if (config.modOn) { // If the moderation commands are enabled
      if (member != null || member != undefined) { // If the member exists
        member.ban({
          reason: reason,
          days: days
        }); // Ban the member
      } else { // Otherwise
        message.channel.send('There is no user with that username.'); // Output error
        return; // Return
      }
      message.delete(); // Delete the message
    }
  }
}
module.exports = Ban;