const Discord = require("discord.js");

exports.run = async (vary, message, args) => {

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Você **não possui** a permissão `Gerenciar mensagens`')

const deleteCount = parseInt(args[0], 10);

if(!deleteCount || deleteCount < 2 || deleteCount > 100)
  return message.reply('O número de mensagens para eu deletar deverá ser entre 2 e 100!')

const fetched = await message.channel.fetchMessages({limit: deleteCount});
message.channel.bulkDelete(fetched)
  .catch(error => message.reply(`Ocorreu um erro: ${error}`));
}

exports.config = {
    name: 'clear',
    aliases: ['apagar']
}
