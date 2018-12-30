const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class PID extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'pid',
      group: 'random',
      memberName: 'pid',
      description: 'Displays the definitely correct PID values in the channel.',
      throttling: {
        usages: 1,
        duration: 60
      }
    });
  }
  async run(message, args) {
    var p = Math.random();
    var i = Math.random();
    var d = Math.random();
    message.channel.send("Your correct values are:");
    message.channel.send("P: " + p);
    message.channel.send("I: " + i);
    message.channel.send("D: " + d);
  }
}
module.exports = PID;
