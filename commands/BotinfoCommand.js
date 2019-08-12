const Discord = require("discord.js");
const ms = require("ms")
const moment = require("moment")
moment.locale('pt-BR');
require("moment-duration-format")

exports.run = async ({vary, message, args}, t) => {

const promises = [
    vary.shard.fetchClientValues('guilds.size'),
    vary.shard.broadcastEval('this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)'),
];

return Promise.all(promises)
    .then(results => {
        const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
        const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0); 
const duration = moment.duration(vary.uptime).format('D [d], H [h], m [m], s [s]');
let embedinfo = new Discord.RichEmbed()
.setColor('#7289DA')
.setThumbnail(vary.user.displayAvatarURL)
.setTitle(" **<:vary_wink:551817912361418963>|** \`\`Informações sobre mim:\`\`")
.addField('** Introdução:**', '\`Olá! Eu sou um simples bot para essa maravilhosa plataforma o Discord, possuo várias funções, tanto administrativas quanto entreterimento! Se você solicitou este comando, é porque você quer saber mais sobre mim. Logo abaixo está minhas informações gerais! E caso você gostar de mim, me ajude dando um upvote e adicionando-me em seu servidor!\`', true)
.addField('**<:FyCustomerServiceInformation:554113734113755138> Veja meus comandos:**', `v;help`, true)
.addField('**<:coroinha:519546425080807434> Criador:**', '<@375627393773207554>', true)
.addField('**<:FyKeyword:554113735724367882> Prefixo ativo:**', `v;`, true)
.addField('**<:FyNodeJs:558702151598080000> Desenvolvido em:**', 'Discord.js - _v_ **_11.4.2_**', true)
.addField("**<a:vary_happy:560869540561551370> Estou conectado a:**", ` **<:usuarios_azul:572140873601646633> ${totalMembers}** usuários\n **<:Prancheta_lista:575830400480444430> ${totalGuilds}** servidores `, true)
.addField("**<:vary_coberto:561295282613125150> Estou acordado a:**", `${duration}`, true)
.addField('**<:LinkInfographic_icons:590957283543089181> Adicione-me em seu servidor:**', '[Clique aqui](https://discordapp.com/api/oauth2/authorize?client_id=546490972901605386&permissions=8&scope=bot)', true)
.addField('**<:FyLink:556600524032704532> Meu servidor de suporte:**', '[Clique aqui](https://discord.gg/VBfjn35)', true)
.addField('**🏅 Menções Honrosas**' ,'`🔥ImDiogo912🔥#8687` Se não fosse por ele, eu nem iria existir!', true)
.setFooter(`Solicitado por: ${message.author.username}`, message.author.avatarURL)
message.channel.send(embedinfo)
  })
}

exports.config = {
    name: 'botinfo',
    aliases: ['vary'],
    category: 'bot'
}
