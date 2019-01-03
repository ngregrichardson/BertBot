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
      description: 'Adds/removes you to the spam chat. **R**',
      args: [
        {
          key: 'function',
          prompt: 'Would you like to add or remove the user?',
          type: 'string'
        },
        {
          key: 'user',
          prompt: 'Who would you like to add or remove?',
          type: 'user'
        }
      ]
    });
  }
  hasPermission(message) {
    if(config.restrictedCommandRoles) return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }
  async run(message, args) {
    let func;
    let member;
    let role = message.guild.roles.find(r => r.name === "student");
    let spamRole = message.guild.roles.find(r => r.name === "spam");
    if(args === null) {
      message.channel.send("Please use the correct format! `!spam add|remove @username`"); 
      return;
    }else if(args.function !== undefined && args.user === undefined) {
      func = args.function;
      member = message.member;
    }else if(args.user !== undefined && args.function !== undefined) {
      func = args.function;
      member = message.guild.members.find(m => m.id === args.user.id);
    }else {
      message.channel.send("Please use the correct format! `!spam add|remove @username`"); 
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
        message.channel.send("Please use the correct format! `!spam add|remove @username`");
        return;
      }
    }
  }
}
module.exports = Spam;
