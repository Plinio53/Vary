const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {

    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("Permissão `Gerenciar canais` não encontrada em seu cargo!")
    let mensg = args.join(" ");
    if(!mensg)
        return message.channel.send("`Use: v;chat <on/off>`")
    if(args[0] == "OFF" || args[0] == "off"){
        let role = message.guild.roles.find("name", "@everyone");
        message.channel.overwritePermissions(role, {SEND_MESSAGES: false});
        message.channel.send(t(commands:clear.disabled))
        return;
    }
    if(args[0] == "ON" || args[0] == "on"){
        let role = message.guild.roles.find("name", "@everyone");
        message.channel.overwritePermissions(role, {SEND_MESSAGES: true});
        message.channel.send(t(commands:clear.enabled))
        return;
    }
    message.reply(t(commands:clear.correctUsage))

    
    
 }

exports.config = {
    name: 'chat',
    aliases: []
}
