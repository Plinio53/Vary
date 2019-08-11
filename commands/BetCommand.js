var usuario1 = []
var usuario2 = []
var database = require('../database.js')

exports.run = ({ message, args }, t) => {
  let razaod = args.slice(1).join(' ')
  let apostador = message.author.id
  let apostador2 = Math.round(Math.random() * 1)
  let quantidade = Math.round(Math.random() * 1)
  let vencedor = Math.round(Math.random() * 1)
  let perdedor = Math.round(Math.random() * 1)
  let random = Math.round(Math.random() * 1)

  if (message.mentions.users.size > 0) {
    apostador2 = message.mentions.users.first().id

    if (!usuario1.includes(apostador + message.channel.id)) {
      if (!usuario2.includes(apostador + message.channel.id)) {
        if (!usuario2.includes(apostador2 + message.channel.id)) {
            database.Users.findOne({
              'userID': apostador
            }, function (arro, apostou) {
              if (apostou) {
                database.Users.findOne({
                  'userID': apostador2
                }, function (rrro, recebeu) {
                  if (recebeu) {
                    if (!razaod.length < 1) {
                      quantidade = parseInt(args[1])

                      if (parseInt(args[1]) >= 1) {
                        if (apostou.Smiles >= quantidade && recebeu.Smiles >= quantidade) {

                          usuario1.unshift(apostador + message.channel.id)
                          usuario2.unshift(apostador2 + message.channel.id)

                          setTimeout(function () {
                            usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                            usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                          }, 20 * 1000)

                          message.channel.send(t('commands:apostar.receivedOrder', { apostador: apostador, apostador2: apostador2, Smiles: Number(quantidade).toLocaleString() }));
                          message.channel.awaitMessages(mensagem => mensagem.author.id === apostador2 && (mensagem.content === t('commands:apostar.accept') || mensagem.content === t('commands:apostar.decline')), {
                            maxMatches: 1,
                            time: 20000,
                            errors: ['time']
                          }).then((coletado) => {
                            var resposta = coletado.first().content

                            if (resposta === t('commands:apostar.decline')) {
                              usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                              usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                              message.channel.send(t('commands:apostar.betDeclined'))
                            } else if (resposta === t('commands:apostar.accept')) {
                              vencedor = random === 1 ? apostou : recebeu
                              perdedor = random === 0 ? apostou : recebeu
                              vencedor.Smiles += (quantidade)
                              vencedor.save()
                              perdedor.Smiles -= (quantidade)
                              perdedor.save()
                              message.channel.send(t('commands:apostar.betFinish', { vencedor: vencedor._id, Smiles: (Number(quantidade).toLocaleString()) }));
                              usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                              usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                            }
                          }, function () {
                            usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                            usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                            message.channel.send(t('commands:apostar.timeout'))
                          })
                        } else {
                          message.channel.send(t('commands:apostar.insufficientMoney'))
                        }
                      } else {
                        message.channel.send(t('commands:apostar.underZero'))
                      }
                    } else {
                      message.channel.send(t('commands:apostar.noArgs'))
                    }
                  } else {
                    message.channel.send(t('commands:apostar.errorOccurred'))
                  }
                })
              } else {
                message.channel.send(t('commands:apostar.errorOccurred'))
              }
            })
        } else {
          message.channel.send(t('commands:apostar.memberAlreadyRequested'))
        }
      } else {
        message.channel.send(t('commands:apostar.requestAlreadyReceived'))
      }
    } else {
      message.channel.send(t('commands:apostar.youAlreadyRequested'))
    }
  } else {
    message.channel.send(t('commands:apostar.noMention'))
  }
}

exports.config = {
    name: 'bet',
    aliases: ['apostar'],
    category: 'economy'
}
