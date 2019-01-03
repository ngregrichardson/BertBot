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
      description: 'Displays 100% correct calculated PID values',
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
    message.channel.send("Your correct values are:\n\nP: " + p + "\n\nI: " + i + "\n\nD: " + d);
  }
}
module.exports = PID;
