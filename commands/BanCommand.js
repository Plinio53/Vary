const Discord = require("discord.js");

exports.run = async ({ vary, message, args }, t) => {
if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Permissão `Banir membros` não encontrada em seu cargo!")

let member = message.mentions.members.first() || message.guild.members.get(args[0]);
let channel = member.guild.channels.find('name', '🚫│punições');
if(!member)
  return message.reply("Não encontrei esse usuário neste servidor");
    if (!member.bannable) return message.reply("Eu não posso punir este usuário, meu cargo é menor que o do usuário a ser punido!")

let reason = args.slice(1).join(' ');
if(!reason) reason = "Sem motivo";
    const banembed = new Discord.RichEmbed()

        .setThumbnail(member.user.avatarURL)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setDescription(`O usuário foi punido(a) por desrespeitar as regras do servidor!`)
        .addField("🚫 | Punição", `Banimento`)
        .addField("👮🏻 | Staff", `${message.author.username}`)
        .addField("🔧 | ID do staff", `${message.author.id}`)
        .addField("<:FyThief:573322813667016724> | Usuário", `${member}`)
        .addField("⚙️ | ID do usuário:", `${member.id}`)
        .addField("📑 | Motivo", reason)
        .setTimestamp(new Date())

await member.ban(reason)
    await member.send(`Você foi banido do servidor ${message.guild.name} por ${message.author.username} com o motivo: ${reason}`)
  .catch(error => message.channel.send(`Desculpe, ${message.author} ocorreu um erro ao executar este comando: ${error}`));
  message.reply(`baniu ${member.user} com o motivo: ${reason}`)
channel.send(banembed);
}

exports.config = {
    name: 'ban',
    aliases: ['banir']
}
