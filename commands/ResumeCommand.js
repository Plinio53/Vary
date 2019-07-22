const Discord = require("discord.js");

exports.run = ({vary, message, args}, t) => {

  let player = vary.calls.get(message.guild.id)
  if (!player.player.track) message.channel.send('Não estou tocando nada no momento!')
  else {
  player.pause().then(message.channel.send('Música retomada!'))
  }
}

exports.config = {
    name: 'resume',
    aliases: [],
    category: 'music'
}
