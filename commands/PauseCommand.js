const Discord = require("discord.js");

exports.run = ({vary, message, args}, t) => {

  let player = vary.calls.get(message.guild.id)
  if (!player.player.track) message.channel.send('Não estou tocando nada no momento.')
  else {
  message.channel.send('Música pausada!').then(player.pause())
  }
}

exports.config = {
    name: 'pause',
    aliases: ['pausar'],
    category: 'music'
}
