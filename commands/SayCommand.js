const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Permissão `Gerenciar mensagens` não encontrada em seu cargo!")
if (args[0] == null) {return message.channel.send(`Digite algo para eu mandar!`)}
    message.delete().catch(O_o=>{});
    try {
JSON.parse(args.join(" "))
} catch (e) {
message.channel.send(args.join(" "))
}
  }

  exports.config = {
      name: 'say',
      aliases: ['falar'],
      category: 'admin'
  }
