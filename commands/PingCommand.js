const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
const m = await message.channel.send("Ping?");
m.edit(`💻 Shard: ${vary.shard.id}/2 \n🏓 Ping ${Math.round(vary.ping)}ms.\n ⚡ API ${m.createdTimestamp - message.createdTimestamp}ms.`);
}

exports.config = {
    name: 'ping',
    aliases: ['pong'],
    category: 'bot'
}
