const Discord = require("discord.js")
const database = require("../database.js")

exports.run = ({vary, message, args}, t) => {
    database.Guilds.findOne({
        "_id": message.guild.id
    }, function(error, server) {
        if(server.Key) {
            if (vary.lavalinkManager.manager.has(message.guild.id)) {
            let val = args[0]
                vary.calls.get(message.guild.id).player.volume(val)
                message.reply(`Volume alterado para ${args[0]}/150`)
            }
        } else {
            message.channel.send('Oi, sabe que este comando é só para doadores? Caso queira me apoiar corra até: https://www.patreon.com/ItsDiogo912')
        }
    });
}

exports.config = {
    name: 'volume',
    aliases: ['vol'],
    category: 'music'
}
