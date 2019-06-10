const Discord = require("discord.js")

module.exports = async (vary) => {

console.log(`Reconectando ao Discord')

vary.user.setStatus('dnd'),
vary.user.setGame('Reconnecting...');

}
