const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
    message.guild.voiceChannel.leave();
    vary.lavalinkManager.manager.delete(message.guild.id)
}

exports.config = {
    name: 'leave',
    aliases: ['sair', 'disconnect', 'dc']
}
