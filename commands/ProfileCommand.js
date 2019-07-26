const Discord = require("discord.js");
const mongoose = require('mongoose');
const db = require('../database.js');
exports.run = async ({vary, message, args}, t) => {
    let member = message.mentions.users.first() || vary.users.get(args[0]) || message.author;
    db.Users.findOne({userID: member.id}, (err, user) =>{
  
  if (err) throw err;
  
  if (user) {
      const profile = new Discord.RichEmbed()
      profile.setThumbnail(member.avatarURL)
      profile.addField(`Perfil de:`,`${member.tag}`)
      profile.addField(`Smiles:`,`${user.Smiles}`)
      profile.addField(`Reputação:`,`${user.Reps}`)
  message.channel.send(profile)
  
/*  } else if (user.Doador) {
    const donator = new Discord.RichEmbed()
    donator.setThumbnail(member.avatarURL)
    donator.addField(`Perfil de:`,`${member.tag}`)
    donator.addField(`Smiles:`,`${user.Smiles}`)
    donator.addField(`Reputação:`,`${user.Reps}`)
    donator.addField(`Doador:`,`Sim`)
    // donator.addField(`Doou:`,`${user.Donate}`)
    message.channel.send(donator) */
  } else {
    message.channel.send('Parece que esta conta não foi registrada na minha database')
  }
  });
}

exports.config = {
    name: 'profile',
    aliases: ['perfil'],
    category: 'random'
}
