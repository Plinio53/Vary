const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (vary, message, args, level) => {
    if (!message.channel.nsfw) return message.channel.send('Este comando apenas pode ser usado em um canal NSFW!')
    superagent.get('https://nekos.life/api/v2/img/lewd')
        .end((err, response) => {
            const lewdembed = new Discord.RichEmbed()
                .setImage(response.body.url)
                .setColor(`RANDOM`)
            message.channel.send(lewdembed);
        })
}

exports.config = {
    name: 'neko',
    aliases: []
}
