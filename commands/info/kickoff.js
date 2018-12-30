const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Kickoff extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'kickoff',
      group: 'info',
      memberName: 'kickoff',
      description: 'Displays the amount of time until kickoff.'
    });
  }
  async run(message, args) {
    var t = getTimeRemaining('January 05 2019 10:00:00 EST-0400');
    message.channel.send("There are **" + t.days + "** days, **" + t.hours + "** hours, **" + t.minutes + "** minutes, and **" + t.seconds + "** seconds left until the 2019 kickoff!");
  }
}
module.exports = Kickoff;
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
