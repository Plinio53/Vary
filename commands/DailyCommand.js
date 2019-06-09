const Discord = require("discord.js")
const mongoose = require("mongoose")
const db = require("../database.js")

exports.run = (vary, message, args) => {
  db.Users.findOne({userID: message.author.id}, (err, user) =>{
      if (user) {
          if ((86400000 / 2) - (Date.now() - user.coinsLastTime) > 0) return message.channel.send('Você já pegou seus Smiles diários hoje, espere para pegar novamente')
          user.Smiles += 350
          user.coinsLastTime = Date.now()
          message.reply('Você pegou 350 smiles diários')
          user.save();
          ;
} else {
          message.channel.send('Parece que sua conta não foi registrada na minha database, peça a um dos meus desenvolvedores para o registrar')
      }
      });
}

exports.config = {
    name: 'daily',
    aliases: ['diário']
}
