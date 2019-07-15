const Vary = require("discord.js")

exports.run = async ({vary, message, args}, t) => {
    let staff = new Vary.RichEmbed()
        .setTitle(`Pessoas que contribuiram no meu desenvolvimento`)
        .addField(`Criador`,`${vary.users.get('375627393773207554').tag}`)
        .addField(`Seguranças:`,`${vary.users.get('268526982222970880').tag} \n${vary.users.get('485837271967465472').tag}`)
        .addField(`Desenvolvedor do Back-end:`,`${vary.users.get('375627393773207554').tag} \n${vary.users.get('268526982222970880').tag} \n${vary.users.get('395788326835322882').tag}`)
        .addField(`Desenvolvedor do Front-end:`,`${vary.users.get('375627393773207554').tag}`)
        .addField(`Suporte:`,`${vary.users.get('234417232149479426').tag}`)
        .addField(`Desenhistas:`,`${vary.users.get('203199927986159616').tag} \n${vary.users.get('419125869475397633').tag} \n${vary.users.get('366405124702339072').tag}`)
        /*.addField(`Tradutores:`,`${vary.users.get('375627393773207554').tag}`)*/
        .addField(`Doadores:`,`https://paypal.me/maidVary` /*`${vary.users.get('ID').tag}`*/)
       /*.addField(`Bug Hunters:`,`${vary.users.get('ID').tag}`)*/
    message.reply(staff)
}


exports.config = {
    name: 'contributors',
    aliases: ['contribuidores', 'staff'],
    category: 'random'
}