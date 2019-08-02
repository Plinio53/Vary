const Discord = require("discord.js")
const mongoose = require("mongoose")
const db = require("../database.js")

exports.run = ({vary, message, args}, t) => {
  db.Users.findOne({userID: message.author.id}, (err, user) =>{
      if (user) {
          if ((86400000 / 2) - (Date.now() - user.coinsLastTime) > 0) return message.channel.send(t("commands:daily.dailyLastTime"))
          user.Smiles = user.Smiles + 350
          user.coinsLastTime = Date.now()
          message.reply(t("commands:daily.daily"))
          user.save();
          ;
} else {
          message.channel.send(t("errors:generic", {error: error}))
      }
      });
}

exports.config = {
    name: 'daily',
    aliases: ['diário'],
    category: 'economy'
}
