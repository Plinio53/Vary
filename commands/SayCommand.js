const Discord = require("discord.js");

exports.run = async ({ message, args }, t) => {
  function isJson(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Permissão `Gerenciar mensagens` não encontrada em seu cargo!")
  if (!args[0]) return message.channel.send(`Digite algo para eu mandar!`)
  message.delete().catch(O_o => { });
  if (isJson(args.join(' '))) return message.channel.send(JSON.parse(args.join(' ')))
  else {
    message.channel.send(args.join(' '))
  }
}

exports.config = {
  name: 'say',
  aliases: ['falar'],
  category: 'admin'
}
