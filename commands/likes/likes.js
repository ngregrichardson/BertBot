const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Likes extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'likes',
      group: 'random',
      memberName: 'likes',
      description: 'Displays your current amount of likes.',
      throttling: {
        usages: 1,
        duration: 60
      }
    });
  }
  async run(message, args) {
    message.author.send("");
  }
}
module.exports = Likes;
