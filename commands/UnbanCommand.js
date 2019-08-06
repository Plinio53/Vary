const Discord = require("discord.js")

exports.run = async ({vary, message, args}, t) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(t("errors:missingOnePermission", {permission: t("permissions:BAN_MEMBERS")}))
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(t("errors:botMissingOnePermission", {permission: t("permissions:BAN_MEMBERS")}))
    
    message.guild.unban(args[0]).then(msg => {
        message.channel.send(t("commands:unban.unbanned", {author: message.author}))
    }).catch(err => {
        message.channel.send(t("errors:generic", {error: err}))
    })
}

exports.config = {
    name: 'unban',
    aliases: ['desbanir'],
    category: 'admin'
}