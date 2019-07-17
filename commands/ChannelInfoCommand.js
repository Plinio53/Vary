const Discord = require('discord.js');

exports.run = (vary, message, args) => {
    let nsfwV = message.channel.nsfw ? 'Sim' : 'Não';
    let parentV = message.channel.parent ? message.channel.parent : 'Sem categoria';
    let topicV = message.channel.topic ? message.channel.topic : '';
    let embed = new Discord.RichEmbed()
        .setTitle('Nome: ' + message.channel.name)
        .setDescription('Tópico: ' + topicV)
        .addField('NSFW', nsfwV, true)
        .addField("Categoria: ", parentV, true)
        .addField('Posição: ', message.channel.position, true)
        .setColor(client.config.embedColor);

    message.channel.send(embed);
}

exports.config = {
    name: 'channelinfo',
    aliases: [],
    category: 'random'
}
