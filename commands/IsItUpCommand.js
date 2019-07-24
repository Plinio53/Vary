const Vary = require("discord.js")
const fetch = require('node-fetch')

exports.run = async ({vary, message, args}, t) => {
    url = url.replace(PROTOCOL_REGEX, '').replace(PATH_REGEX, '')
    const embed = new SwitchbladeEmbed(author)
    channel.startTyping()
    const body = await fetch(`https://isitup.org/${url}.json`).then(res => res.json())
    if (body.response_code) {
      body.response_time *= 1000
      embed.setTitle(t("commands:isitup.isUp"))
        .setDescription(t("commands:isitup.details", { body }))
    } else {
      throw new CommandError(t("commands:isitup.isDown"))
    }
    message.channel.send(embed)
}

exports.config = {
    name: 'isitup',
    aliases: [],
    category: 'random'
}