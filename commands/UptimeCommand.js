const Discord = require("discord.js");
const ms = require("ms")
const moment = require("moment")
moment.locale('pt-BR');
require("moment-duration-format")

exports.run = async ({vary, message, args}, t) => {
let duration = moment.duration(vary.uptime).format('D [d], H [h], m [m], s [s]');

message.channel.send(t("commands:uptime.uptime", {uptime: duration}));
}

exports.config = {
    name: 'uptime',
    aliases: [],
    category: 'bot'
}
