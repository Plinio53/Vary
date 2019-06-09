const Discord = require("discord.js");

exports.run = async (vary, message, args) => {
let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
let day = message.guild.createdAt.getDate()
let month = 1 + message.guild.createdAt.getMonth()
let year = message.guild.createdAt.getFullYear()
 let sicon = message.guild.iconURL;
 let serverembed = new Discord.RichEmbed()
 .setAuthor(message.guild.name, sicon)
 .setFooter(`📅 Server criado • ${day}.${month}.${year}`)
 .setColor("#7289DA")
 .setThumbnail(sicon)
 .addField("<:discordlogo:541641812411023381> Nome", message.guild.name, true)
 .addField("<:appleid:533758440892268584> ID", message.guild.id, true)
 .addField("<:coroinha:519546425080807434> Dono", message.guild.owner.user.tag, true)
 .addField("🌎 Região", message.guild.region, true)
 .addField("💬 Channels", message.guild.channels.size, true)
 .addField("<:usuarios_azul:572140873601646633> Membros", message.guild.memberCount, true)
 .addField("🙋 Humanos", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
 .addField("<:Blobbot:575059789848248340> Bots", message.guild.members.filter(m => m.user.bot).size, true)
 .addField("<:online:533757175424745472> Online", online.size, true)
 .addField("<:partner_discord:528157364990509057> Cargos", message.guild.roles.size, true);
 message.channel.send(serverembed);

}

exports.config = {
    name: 'serverinfo',
    aliases: ['servidor']
}
