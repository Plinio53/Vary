const Discord = require("discord.js")
const VaryLog = require("varylog");

module.exports = async (vary) => {

VaryLog.Reconnect();

vary.user.setStatus('dnd'),
vary.user.setGame('Reconnecting...');

}
