const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(t("errors.missingOnePermission", {permission: 'Gerenciar canais'}))
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.reply(t("errors.botMissingOnePermission", {permission: 'Gerenciar canais'}))
    let mensg = args.join(" ");
    if(!mensg)
        return message.channel.reply(t("commands:chat.correctUsage"))
    if(args[0] == "OFF" || args[0] == "off"){
        let role = message.guild.roles.find("name", "@everyone");
        message.channel.overwritePermissions(role, {SEND_MESSAGES: false});
        message.channel.send(t("commands:chat.disabled", {author: message.author}))
        return;
    }
    if(args[0] == "ON" || args[0] == "on"){
        let role = message.guild.roles.find("name", "@everyone");
        message.channel.overwritePermissions(role, {SEND_MESSAGES: true});
        message.channel.send(t("commands:chat.enabled", {author: message.author}))
        return;
    }
    message.channel.reply(t("commands:chat.correctUsage"))

    
    
 }

exports.config = {
    name: 'chat',
    aliases: [],
    category: 'admin'
}
