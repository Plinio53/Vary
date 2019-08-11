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
    .setTitle('**Adeus!**')
    .setDescription(`😢 **${member}** saiu do servidor!`)
    .addField('<a:BlobCry:574968840174174247> | Agora temos:', member.guild.memberCount, 'membros!')
    .setTimestamp()

         database.Guilds.findOne({ _id: member.guild.id }, function (error, servidor) {
        if(servidor){
            if(servidor.Contador){
                member.guild.channels.get(servidor.ChatContador).setTopic(`Temos um total de: ${slots(member.guild.memberCount)} Membros`)
            } else {}
        if(servidor.Leave){
                if(member.guild.channels.get(servidor.LeaveChannel)){
                    member.guild.channels.get(servidor.LeaveChannel).send(embed).catch(err => {
                        servidor.Leave = false,
                        servidor.LeaveChannel = 'Nenhum',
                        servidor.save()
                    });
                } else {
                    servidor.Leave = false,
                    servidor.LeaveChannel = 'Nenhum',
                    servidor.save()
                }
            } else {}
        } else {}
    });

}
