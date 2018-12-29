const commando = require('discord.js-commando');
class Winner extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'winner',
      group: 'random',
      memberName: 'winner',
      description: 'Displays the guaranteed next winner of the next FRC season.',
      throttling: {
        usages: 1,
        duration: 60
      }
    });
  }
  async run(message, args) {
    var team = Math.floor(Math.random() * 7331);
    message.channel.send("FRC Team #" + team + " will win in the " + (new Date().getFullYear() + 1) + " season!");
  }
}
module.exports = Winner;
