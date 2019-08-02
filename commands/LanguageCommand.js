const Discord = require("discord.js")
const database = require("../database.js")

exports.run = async ({vary, message, args}, t) => {
    database.Guilds.findOne({
        _id: message.guild.id
    }, function (error, server) {
        if(server){
   let languages = new Discord.RichEmbed()
    .setTitle(t("commands:lang.choose"))
    .addField(t("languages:br"), t("commands:languages.translatedby"), {translator: 'ItsDiogo912'})
    .addField(t("languages:en"), t("commands:languages.translatedby"), {translator: ''})
    message.reply(languages).then(msg => {
        msg.react('flag_us');
        msg.react('flag_br');
    const collector = msg.createReactionCollector((r, u) => (r.emoji.name === 'flag_us', 'flag_br') && (u.id !== vary.user.id && u.id === message.author.id))
    collector.on("collect", r=>{
        switch (r.emoji.name) {
        case'flag_us':
        server.Lang = "en-US"
        break;
        case'flag_br':
        server.Lang = "pt-BR"
        }
        })
  })
} else {
    let server = new database.Guilds({
        _id: message.guild.id,
    });
    server.save();
    message.reply(`Use o comando novamente!`);
}
});  
}

exports.config = {
    name: 'language',
    aliases: ['lang', 'linguagem'],
    category: 'config'
}
