const Discord = require("discord.js")
const mongoose = require("mongoose")
const db = require("../../database.js")

exports.run = (vary, message, args) => {
    let member = message.mentions.users.first() || vary.users.get(args[0])
  db.Users.findOne({userID: member.id}, (err, user) =>{
      if (user) {
          if(user === message.author.id) return
          if ((86400000 / 2) - (Date.now() - user.RepLastTime) > 0) return message.channel.send('Você já deu ponto de reputação em alguem hoje!')
          user.Reps += 1
          user.RepLastTime = Date.now()
          message.reply(`<@${message.author.id}> deu um ponto de reputação a <@${member.id}>, agora <@${member.id}> possui ${user.Reps}`)
          user.save();
          ;
        } else {
          message.channel.send('Parece que sua conta não foi registrada na minha database, peça a um dos meus desenvolvedores para o registrar')
      }
      });
}

exports.config = {
    name: 'rep',
    aliases: []
}
