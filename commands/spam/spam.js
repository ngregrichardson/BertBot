const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Spam extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'spam',
      group: 'spam',
      memberName: 'spam',
      description: 'Manages the spam chat **R**',
      args: [
        {
          key: 'term',
          prompt: 'The correct usage of `!spam` is `!spam **add|remove** @username`',
          type: 'string'
        },
        {
          key: 'user',
          prompt: 'The correct usage of `!spam` is `!spam add|remove **@username**`',
          type: 'user'
        }
      ]
    });
  }
  hasPermission(message) {
    if(config.restrictedCommandRoles) return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }
  async run(message, { term, user }) {
    let func;
    let member;
    let role = message.guild.roles.find(r => r.name === "student");
    let spamRole = message.guild.roles.find(r => r.name === "spam");
    if(term !== undefined && user === undefined) {
      func = term;
      member = message.member;
    }else if(user !== undefined && term !== undefined) {
      func = term;
      member = message.guild.members.find(m => m.id === user.id);
    }else {
      message.channel.send('The correct usage of `!spam` is `!spam **add|remove @username**`'); 
      return;
    }
    if (member.roles.find(r => r.id === role.id)) {
      if(func === "add") {
        if(member.roles.find(r => r.id === spamRole.id)) {
          return;
        }else {
          member.addRole(spamRole).catch(console.error);
        }
      }else if(func === "remove") {
        if(member.roles.find(r => r.id === spamRole.id)) {
          member.removeRole(spamRole).catch(console.error);
        }else {
          return;
        }
      }else {
        message.channel.send('The correct usage of `!spam` is `!spam **add|remove** @username`');
        return;
      }
    }
  }
}
module.exports = Spam;
