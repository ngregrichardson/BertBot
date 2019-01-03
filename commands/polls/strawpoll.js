const commando = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const request = require('node-superfetch');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

module.exports = class Strawpoll extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'strawpoll',
      group: 'polls',
      memberName: 'strawpoll',
      description: 'Creates a strawpoll **R**',
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [{
        key: 'title',
        prompt: 'The correct usage of `!strawpoll` is `!strawpoll "**title**" ["option 1"] ["option 2"]...`',
        type: 'string',
        max: 200
      }, {
        key: 'options',
        prompt: 'The correct usage of `!strawpoll` is `!strawpoll **title** ["options..."]',
        type: 'string',
        infinite: true,
        max: 140
      }]
    });
  }
  hasPermission(message) {
    if(config.restrictedCommandRoles) return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }
  async run(message, { title, options }) {
    if (options.length < 2) {
      return message.reply('Please provide more than one choice.');
    }
    if (options.length > 31) {
      return message.reply('Please provide thirty or less choices.');
    }
    try {
      const { body } = await request.post('https://www.strawpoll.me/api/v2/polls').set({ 'Content-Type': 'application/json' }).send({ title, options });
      message.delete();
      return message.say(stripIndents`
${body.title}
http://www.strawpoll.me/${body.id}
`);
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
}
