const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
const text = args
const vaporwavefied = text.split('').map(char => {
      const code = char.charCodeAt(0)
      return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char
    }).join('')
    message.channel.send(vaporwavefied)
}

exports.config = {
    name: 'vaporwave',
    aliases: [],
    category: 'random'
}
