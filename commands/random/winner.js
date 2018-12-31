const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

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
    var date = new Date();
    var year;
    if(date.getMonth() <= 4) {
      year = date.getFullYear();
    }else {
      year = date.getFullYear() + 1;
    }
    message.channel.send("FRC Teams #" + Math.floor(Math.random() * 7331) + ", #" + Math.floor(Math.random() * 7331) + ", and #" + Math.floor(Math.random() * 7331) + " will win in the " + year + " season!");
  }
}
module.exports = Winner;
