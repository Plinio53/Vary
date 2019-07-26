const Discord = require("discord.js")
const database = require("../database.js")

function slots(_números) {
    _números = _números.toString();
    var texto = ``, 
    números = { 
        1: ':one:', 
        2: ':two:', 
        3: ':three:', 
        4: ':four:', 
        5: ':five:', 
        6: ':six:', 
        7: ':seven:', 
        8: ':eight:', 
        9: ':nine:', 
        0: ':zero:'
    };
    for(let i =0; i < _números.length; i++)
        texto += números[parseInt(_números[i])];
    return texto;
}

module.exports = async (vary, member) => {

    const memberavatar = member.user.avatarURL

    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(memberavatar)
    .setTitle('**Bem vindo!**')
    .setDescription(`<:meowblush:558513808264527882> Seja Bem vindo(a) **${member}** Ao servidor`)
    .addField('<a:BlobBongo:575332771317284911> | Você é o membro de numero:', member.guild.memberCount)
    .setTimestamp()

         database.Guilds.findOne({ _id: member.guild.id }, function (error, servidor) {
        if(servidor){
            if(servidor.Contador){
                member.guild.channels.get(servidor.ChatContador).setTopic(`Temos um total de: ${slots(member.guild.memberCount)} Membros`)
            } else {}
        if(servidor.Welcome){
                if(member.guild.channels.get(servidor.WelcomeChannel)){
                    member.guild.channels.get(servidor.WelcomeChannel).send(embed).catch(err => {
                        servidor.Welcome = false,
                        servidor.WelcomeChannel = 'Nenhum',
                        servidor.save()
                    });
                } else {
                    servidor.Welcome = false,
                    servidor.WelcomeChannel = 'Nenhum',
                    servidor.save()
                }
            } else {}
        } else {}
    });


}
