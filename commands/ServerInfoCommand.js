const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
/*
var emojis;
if (message.guild.emojis.size === 0) {
emojis = 'Nenhum';
} else {
emojis = message.channel.guild.emojis.map(e => e).join(" ");
}
*/
let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
let day = message.guild.createdAt.getDate()
let month = 1 + message.guild.createdAt.getMonth()
let year = message.guild.createdAt.getFullYear()
let serverembed = new Discord.RichEmbed()
.setFooter(`📅 Server criado • ${day}.${month}.${year}`)
.setColor("#7289DA")
.setThumbnail(sicon)
.setAuthor(message.guild.name, sicon)
.addField("<:discordcanary:601043488619888690> Nome", guild.name, true)
.addField("<:appleid:533758440892268584> ID", guild.id, true)
.addField("<:coroinha:519546425080807434> Dono", guild.owner.user.tag, true)
.addField("🌎 Região", guild.region, true)
.addField("💬 Canais", guild.channels.size, true)
.addField("<:usuarios_azul:572140873601646633> Membros", guild.memberCount, true)
.addField("🙋 Humanos", guild.memberCount - guild.members.filter(m => m.user.bot).size, true)
.addField("<:Blobbot:575059789848248340> Bots", guild.members.filter(m => m.user.bot).size, true)
.addField("<:online:601044843736727600> Online", online.size, true)
// .addField("Emojis", emojis, true)
.addField("💼 Cargos", message.guild.roles.size, true);
 message.channel.send(serverembed);

}

exports.config = {
    name: 'serverinfo',
    aliases: [],
    category: 'random'
}
