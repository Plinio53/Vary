const Discord = require("discord.js");

exports.run = async ({vary, message, args}, t) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(t("errors:missingOnePermission", {permission: 'Administrador'}))
if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply(t("errors:botMissingOnePermission", {permission: 'Administrador'}))

  if (args[0] == null) {return message.channel.send(`Digite algo para eu mandar!`)}
 
  const sayMessage = args.join(" ");

  let servIcon = message.guild.iconURL;
  let esayEmbed = new Discord.RichEmbed()
  .setTitle("🔔 Anúncio")
  .setColor("#0537ff")
  .setThumbnail(servIcon)
  .setDescription(`Escrito por ${message.author}`)
  .addField("Anúncio: \n", `${sayMessage}`)
  .setTimestamp();

  const esayMessage = args.join(" ");
  message.delete().catch(O_o=>{});

  message.channel.send('@everyone')
  message.channel.send(esayEmbed);
}

exports.config = {
    name: 'esay',
    aliases: ['anunciar'],
    category: 'admin'
}
