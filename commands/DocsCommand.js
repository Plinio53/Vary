const Discord = require("discord.js");
const request = require('request')

exports.run = async ({vary, message, args}, t) => {
request({
            url: 'https://djsdocs.sorta.moe/main/stable/embed?q=' + encodeURIComponent(args.join(' ')),
            json: true
        }, (req, res, json) => {
            if (!json) return message.reply(t("commands:docs.noFound", {doc: args.slice(0).join(' ')}));
            message.channel.send({embed: json});
        });
}

exports.config = {
    name: 'docs',
    aliases: [],
    category: 'dev'
}
