const Discord = require('discord.js');
const config = require('../config.json');
var database = require('../database.js');

exports.run = ({vary, message, args}, t) => {
    const ownerID = '375627393773207554';
    if (message.author.id !== ownerID) return message.channel.send("⛔ **ACCESSO NEGADO**");
   let razaou = args.slice(0).join(' ')
    if (!razaou.length < 1) {
        let banir = message.mentions.users.first() || message.mentions.users.first() || vary.users.get(args[0])
        if (banir) {
            if (banir.id === message.author.id) {
                message.reply(`Você não pode se banir de usar o bot.`)
            } else {
                database.Users.findOne({
                    'userID': banir.id
                }, function (arro, alvo) {
                    if (alvo) {
                        if (alvo.Ban) {
                            alvo.Ban = false
                            alvo.Smiles = 0
                            alvo.save()
                            message.channel.send(`${banir.username} foi desbanido com sucesso do meu sistema.`)
                        } else {
                            alvo.Ban = true
                            alvo.Smiles = 0
                            alvo.save()
                            message.channel.send(`${banir.username} foi banido com sucesso dos meu sistema.`)
                        }
                    } else {message.channel.send(`Infelizmente ocorreu um erro!`);}
                })
            }
        } else {message.channel.send(`Usuário não encontrado.`)}
    } else {message.channel.send(`Mencione o usuário ou diga seu ID.`)}
}

exports.config   = {
    name: 'varyban',
    aliases: ['botban'],
    category: 'dev'
};
