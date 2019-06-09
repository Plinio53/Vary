const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Discord = require('discord.js')

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true }, (err) => {
  if (err) return console.log('Erro ao conectar na database!')
  console.log('Conectado ao BANCO DE DADOS!')
})

const Users = new Schema({
userID: String,
Smiles: {type: Number, default: 0},
Doador: {type: Boolean, default: false},
Ban: {type: Boolean, default: false},
CasadoCom: {type: Array, default: []},
Casado: {type: Boolean, default: false},
Criador: {type: Boolean, default: false},
Partner: {type: Boolean, default: false},
Guarda: {type: Boolean, default: false},
Suporte: {type: Boolean, default: false},
coinsLastTime: {type: String, default: '0000'}
});

const Guilds = new Schema({
_id: String,
Lang: {type: String, default: "pt-BR"},
Welcome: {type: Boolean, default: false},
WelcomeChannel: {type: String, default: "🚪│entrada"},
Leave: {type: Boolean, default: false},
LeaveChannel: {type: String, default: "🚪│entrada"},
Partner: {type: Boolean, default: false},
Principal: {type: Boolean, default: false},
Contador: {type: Boolean, default: false},
ChatContador: {type: String, default: 'Nenhum'}
})

var UsersDB = mongoose.model('Users', Users);
var GuildsDB = mongoose.model('Guilds', Guilds);

exports.Guilds = GuildsDB
exports.Users = UsersDB