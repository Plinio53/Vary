const { RichEmbed } = require('discord.js')

exports.run = async ({vary, message, args}, t) => {
  const mss = require('pretty-ms')
  if (!args[0]) {
    return message.reply('Você precisa indicar uma música!')
  }

  if (vary.lavalinkManager.manager.has(message.guild.id)) {
    vary.calls.get(message.guild.id).play(args.join(' ')).then(info => {
      message.reply(t("commands:play.addQueue", {track: info.title}))
    })
  } else {
    let player = await vary.lavalinkManager.join(message.member.voiceChannel.id)
    player.on('playingNow', track => {
      message.channel.send(t("commands:play.playingNow", {track: track.info.title}))
      vary.calls.get(message.guild.id).playingNow = track
    })
    player.play(args.join(' '))
    vary.calls.set(message.guild.id, player)
  }
}

exports.config = {
    name: 'play',
    aliases: ['tocar']
}
