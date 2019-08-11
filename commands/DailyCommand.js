const Dicord = require("discord.js")
const database = require('../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ vary, message, args }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, documento) {
    if (documento) {
      let valor = documento.Equipe ? 1200 : documento.Designer ? 700 : documento.Doador ? 600 : documento.Partner ? 500 : 350
      var tempo = moment.duration.format([moment.duration((parseInt(documento.DailyLastTime) + 86400000) - Date.now())], 'hh:mm:ss')

      if ((parseInt(documento.DailyLastTime) + 86400000) <= (Date.now())) {
        documento.Smiles = documento.Smiles + valor // += valor
        documento.DailyLastTime = Date.now()
        documento.save()
        message.channel.send(t('comandos:daily.collectedMoney', { smiles: valor }))
      } else {
        message.channel.send(t('comandos:daily.alreadyGiven', { time: tempo }))
      }
    } else {
       message.channel.send(t("errors:generic", {error: error}))
    }
  })
}

exports.config = {
    name: 'daily',
    aliases: [],
    category: 'economy'
}
