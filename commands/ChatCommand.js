const Discord = require("discord.js");

exports.run = async (vary, message, args) =>{

    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("Permissão `Gerenciar canais` não encontrada em seu cargo!")
    let mensg = args.join(" ");
    if(!mensg)
        return message.channel.send("`Use: v;chat <on/off>`")
    if(args[0] == "OFF" || args[0] == "off"){
        let role = message.guild.roles.find("name", "@everyone");
        message.channel.overwritePermissions(role, {SEND_MESSAGES: false});
        message.channel.send(`Canal **bloqueado** por: ${message.author}`)
        return;
    }
    if(args[0] == "ON" || args[0] == "on"){
        let role = message.guild.roles.find("name", "@everyone");
        message.channel.overwritePermissions(role, {SEND_MESSAGES: true});
        message.channel.send(`Canal **desbloqueado** por: ${message.author}`)
        return;
    }
    message.reply("Use: `v;chat <on/off>`")

    
    
 }

exports.config = {
    name: 'chat',
    aliases: []
}
