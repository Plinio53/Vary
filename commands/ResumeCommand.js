const Discord = require("discord.js");

exports.run = ({vary, message, args}, t) => {

  if (vary.lavalinkManager.manager.has(message.guild.id)) {
    vary.calls.get(message.guild.id).player.resume()
    
  } else {
      message.channel.send(`Não estou tocando nada!`)
  }
}

exports.config = {
    name: 'resume',
    aliases: [],
    category: 'music'
}
