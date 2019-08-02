const Discord = require('discord.js');

exports.run async = ({vary, message, args}, t) => {

let player = vary.calls.get(message.guild.id)
if (!player.player.track) message.channel.send('Não estou tocando nada no momento.')
else {
message.channel.send('Música terminada!').then(player.player.stop())
 }
}

exports.config = {
    name: 'stop',
    aliases: [],
    category: 'music'
}
