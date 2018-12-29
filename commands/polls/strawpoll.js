const commando = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const request = require('node-superfetch');
module.exports = class Strawpoll extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'strawpoll',
      group: 'polls',
      memberName: 'strawpoll',
      description: 'Creates a new strawpoll and sends the link in the channel. **R**',
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [{
        key: 'title',
        prompt: 'What is the title of the strawpoll?',
        type: 'string',
        max: 200
      }, {
        key: 'options',
        prompt: 'The options in the strawpoll.',
        type: 'string',
        infinite: true,
        max: 140
      }]
    });
  }
  hasPermission(message) {
    return message.member.roles.some(r => ["admin", "mentor", "leader"].includes(r.name));
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
