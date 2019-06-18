const Discord = require("discord.js");

exports.run = (vary, message, args) => {

  if (vary.lavalinkManager.manager.has(message.guild.id)) {
    vary.calls.get(message.guild.id).player.stop()
    
  } else {
      message.channel.send(`Não estou tocando nada!`)
  }
}

exports.config = {
    name: 'skip',
    aliases: ['pular']
}
