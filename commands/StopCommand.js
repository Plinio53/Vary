const Discord = require('discord.js');

exports.run = async ({vary, message, args}, t) => {

let player = vary.calls.get(message.guild.id)
if (!player.player.track || !vary.lavalinkManager.manager.has(message.guild.id)) return message.channel.send('Não estou tocando nada no momento.')
message.channel.send('Música terminada!').then(player.player.stop())
 
}

exports.config = {
    name: 'stop',
    aliases: [],
    category: 'music'
}
