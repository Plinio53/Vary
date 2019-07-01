const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
message.reply('Oi, caso queira dar um upvote em mim pode acessar o link https://discordbots.org/bot/546490972901605386/vote')
}

exports.config = {
    name: 'vote',
    aliases: ['votar']
}
