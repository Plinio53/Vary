const Discord = require("discord.js");
const moment = require('moment')
moment.locale('pt-br')

exports.run = async ({vary, message, args}, t) => {
if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Permissão `Banir membros` não encontrada em seu cargo!")

    var razao = args.slice(1).join(" ")
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let channel = member.guild.channels.find('name', '🚫│punições');

    if (!member) return message.reply("Não encontrei esse usuário neste srevidor")
    if (!member.bannable) return message.reply("Eu não posso punir este usuário, meu cargo é menor que o do usuário a ser punido!")

    message.delete()

    if (razao.length < 1) return message.reply(embed)

    const warnembed = new Discord.RichEmbed()

        .setThumbnail(member.user.avatarURL)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setDescription(`O usuário foi punido(a) por desrespeitar as regras do servidor!`)
        .addField("🚫 | Punição", `Aviso`)
        .addField("👮🏻 | Staff", `${message.author.username}`)
        .addField("🔧 | ID do staff", `${message.author.id}`)
        .addField("👤 | Usuário", `${member}`)
        .addField("⚙️ | ID do usuário:", `${member.id}`)
        .addField("📑 | Motivo", razao)
        .setTimestamp(new Date())
        channel.send(warnembed)
    message.reply(`avisou ${member.user} com o motivo: ${razao}`)
    await member.send(`Você foi avisado no servidor ${message.guild.name} por ${message.author.username} com o motivo: ${razao}`)
}

exports.config = {
    name: 'warn',
    aliases: ['avisar'],
    category: 'admin'
}
