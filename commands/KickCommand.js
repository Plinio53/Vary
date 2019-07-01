const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Permissão `Expulsar membros` não encontrada em seu cargo!")

let member = message.mentions.members.first() || message.guild.members.get(args[0]);
let channel = member.guild.channels.find('name', '🚫│punições');
if(!member)
  return message.reply("Não encontrei esse usuário neste servidor");
    if (!member.bannable) return message.reply("Eu não posso punir este usuário, meu cargo é menor que o do usuário a ser punido!")

let reason = args.slice(1).join(' ');
if(!reason) reason = "Sem motivo";

    const kickembed = new Discord.RichEmbed()

        .setThumbnail(member.user.avatarURL)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setDescription(`O usuário foi punido(a) por desrespeitar as regras do servidor!`)
        .addField("🚫 | Punição", `Expulsamento`)
        .addField("👮🏻 | Staff", `${message.author.username}`)
        .addField("🔧 | ID do staff", `${message.author.id}`)
        .addField("👤 | Usuário", `${member}`)
        .addField("⚙️ | ID do usuário:", `${member.id}`)
        .addField("📑 | Motivo", reason)
        .setTimestamp(new Date())

await member.kick(reason)
    await member.send(`Você foi expulso do servidor ${message.guild.name} por ${message.author.username} com o motivo: ${reason}`)
  .catch(error => message.reply(`Sorry ${message.author} eu não consigo kickar pois teve um erro: ${error}`));
message.reply(`expulsou ${member.user} com o motivo: ${reason}`)
channel.send(kickembed);

}

exports.config = {
    name: 'kick',
    aliases: ['expulsar']
}
