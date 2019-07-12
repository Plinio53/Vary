const Discord = require('discord.js');

exports.run = ({vary, message, args}, t) => {

args.split('').map(char => {
      const code = char.charCodeAt(0)
      return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char
    }).join('')

}

exports.config = {
    name: 'vaporwave',
    aliases: ['smoke']
}
