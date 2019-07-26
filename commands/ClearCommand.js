const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(t("errors:missingOnePermission", {permission: 'Gerenciar mensagens'}))
if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply(t("errors:botMissingOnePermission", {permission: 'Gerenciar mensagens'}))

const deleteCount = parseInt(args[0], 10);

if(!deleteCount || deleteCount < 2 || deleteCount > 100)
  return message.reply(t("commands:clear.correctUsage"))

const fetched = await message.channel.fetchMessages({limit: deleteCount});
message.channel.bulkDelete(fetched)
  .catch(err => message.reply(t("errors:generic", {error: err})));
}

exports.config = {
    name: 'clear',
    aliases: ['apagar', 'purge'],
    category: 'admin'
}
