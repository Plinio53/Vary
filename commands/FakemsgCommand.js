const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.reply(t("errors:botMissingOnePermission", {permission: t("permissions:MANAGE_WEBHOOKS")}))
    let user = message.mentions.users.first() || message.guild.members.get(args[0])

  let botmessage = args.slice(1).join(' ')

  if (args[0] == null) {return message.reply(t("commands:fakemsg.noMention"))}


    if (args[1] == null) {return message.reply(t("commands:fakemsg.noArgs"))}
    message.channel.createWebhook(user.username, user.avatarURL).then(w => {
        w.send(botmessage);
        w.delete();
    })

}

exports.config = {
    name: 'fakemsg',
    aliases: [],
    category: 'random'
}
