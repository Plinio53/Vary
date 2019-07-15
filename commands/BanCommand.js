const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(t("errors:missingOnePermission", {permission: 'Banir membros'}))
if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(t("errors:botMissingOnePermission", {permission: 'Banir membros'}))

let member = message.mentions.members.first() || message.guild.members.get(args[0]);
let channel = member.guild.channels.find('name', '🚫│punições');
if(!member)
  return message.reply(t("errors:invalidUser"));
    if (!member.bannable) return message.reply(t("errors:memberNotBannable"))

let reason = args.slice(1).join(' ');
if(!reason) reason = "";
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
  .catch(error => message.channel.send(t("errors:generic", {error: error})));
  message.channel.send(t("commands:ban.banned", {author: message.author.username}, {member: member}))
channel.send(banembed);
}

exports.config = {
    name: 'ban',
    aliases: ['banir'],
    category: 'admin'
}
