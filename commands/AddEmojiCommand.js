const Discord = require('discord.js')

exports.run = async ({vary, message, args}, t) => {
if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.reply(t("commands:addemoji.noPerm"))
  message.guild.createEmoji(args[0], args[1])
  message.reply(t("commands:addemoji.sucess"))
}

exports.config = {
    name: 'addemoji',
    aliases: ['criaremoji']
}
