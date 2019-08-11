const Discord = require('discord.js');
const mongoose = require('mongoose');

const db = require('../database.js');

exports.run = ({vary, message, args}, ts) => {
let member = message.mentions.users.first() || vary.users.get(args[0]) || message.author;
  db.Users.findOne({userID: member.id}, (err, user) =>{

if (err) throw err;

if (user) {
message.channel.send(`<@${member.id}> possui ${user.Smiles} Smiles em sua conta!`)

} else {
  message.channel.send('Parece que esta conta não foi registrada na minha database')
}
});
}

exports.config = {
    name: 'smiles',
    aliases: ['money', 'saldo', 'coins'],
    category: 'economy'
}
