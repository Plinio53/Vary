const Discord = require('discord.js');
var database = require('../database.js');

exports.run = ({vary, message, args}, t) => {
    if (message.author.id !== "375627393773207554") return message.channel.send("⛔ **ACCESSO NEGADO**");
   let razaou = args.slice(0).join(' ')
    if (!razaou.length < 1) {
        let rep = message.mentions.users.first() || message.mentions.users.first() || vary.users.get(args[0])
        if (rep) {
            if (rep.id === message.author.id) {
                message.reply(`Você não pode dar reputação em si mesmo.`)
            } else {
                database.Users.findOne({
                    'userID': rep.id
                }, function (user, alvo) {
                    if (alvo) {
                        if ((86400000 / 2) - (Date.now() - user.RepLastTime) > 0) return message.channel.send('Você já deu reputação a alguém hoje.')
                        alvo.Rep = alvo.Rep + 1
                        alvo.RepLastTime = Date.now()
                        message.reply(`Ponto de reputação dado a <@${rep.id}>`)
                        alvo.save();
                        ;
                        user.save();
                        ;
                    } else {message.channel.send(`Infelizmente ocorreu um erro!`);}
                })
            }
        } else {message.channel.send(`Usuário não encontrado.`)}
    } else {message.channel.send(`Mencione o usuário ou diga seu ID.`)}
}

exports.config   = {
    name: 'rep',
    aliases: [],
    category: 'random'
};
