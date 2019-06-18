const Discord = require("discord.js")
const database = require("../../database.js")

exports.run = (vary, message, args) => {
    database.Users.findOne({
        "userID": message.author.id
    }, function(error, usuario) {
        if(usuario.Doador) {
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
    aliases: ['vol']
}
