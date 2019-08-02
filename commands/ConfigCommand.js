const Discord = require('discord.js');
const database = require('../database.js');
const config = require('../config.json');

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

exports.run = ({vary, message, args}, t) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(t("errors:missingOnePermission", {permission: 'Gerenciar servidor'}))
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply(t("errors:botMissingOnePermission", {permission: 'Administrador'}))
    database.Guilds.findOne({
        _id: message.guild.id
    }, function (error, servidor) {
        if(servidor){
            if(args[0] === "anti-invite" || args[0] === "anti-div" || args[0] === "anti-divulgação"){
                if(args[1] === "enable" || args[0] === "ativar") {
                servidor.AntiInvite = true;
                servidor.save();
                message.reply(`Agora apenas membros com permissão administrador poderão divulgar convites!`)
               }
                if(args[1] === "disable" || args[1] === "desativar") {
                    servidor.AntiInvite = false;
                    servidor.save();
                    message.reply(`Agora todos os membros poderão divulgar convites!`)
                }
            } else if(args[0] === 'contador' || args[0] === 'counter'){
                let channel = message.mentions.channels.first() || message.channel;
                if(channel){
                    servidor.Contador = true;
                    servidor.ChatContador = channel.id;
                    servidor.save();
                    message.channel.send(`Contador definido: ${channel}`);
                    message.guild.channels.get(servidor.ChatContador).setTopic(`Temos um total de: ${slots(message.guild.memberCount)} Membros`)
                } else {
                    message.reply(`Mencione um canal`)
                }
            } else if(args[0] === 'welcome' || args[0] === "bem-vindo") {
                let channel = message.mentions.channels.first();
                if(channel){
                    servidor.Welcome = true;
                    servidor.WelcomeChannel = channel.id;
                    servidor.save();
                    message.channel.send(`Chat de Entrada setado em: ${channel}`);
                } else {
                    message.channel.send('Qual será o canal?')
                }
            } else if(args[0] === 'leave' || args[0] === "saída" || args[0] === "saida") {
                let channel = message.mentions.channels.first();
                if(channel){
                    servidor.Leave = true;
                    servidor.LeaveChannel = channel.id;
                    servidor.save();
                    message.channel.send(`Chat de saída setado em: ${channel}`);
                } else {
                    message.channel.send('Qual será o canal?')
                }
            } else {
                message.channel.send(new Discord.RichEmbed()
                    .addField(`Comandos`, '`v;config contador`, `v;config welcome`, `v;config leave`, `v;config anti-div`')
                    .addField(`Módulos`, `
                    Contador: ${servidor.Contador ? 'Ativado' : 'Desativado'}
                    Mensagens de boas-vindas: ${servidor.Welcome ? 'Ativado' : 'Desativado'}
                    Mensagens de saída: ${servidor.Leave ? 'Ativado' : 'Desativado'}
                    Bloqueador de convites: ${servidor.AntiInvite ? 'Ativado' : 'Desativado'}
                    `)
                );
            }
        } else {
            let servidor = new database.Guilds({
                _id: message.guild.id,
                Contador: false,
                ChatContador: 'Nenhum',
                Welcome: false,
                WelcomeChannel: 'Nenhum',
                Leave: false,
                LeaveChannel: 'Nenhum',
                AntiInvite: false,
            });
            servidor.save();
            message.reply(`Use o comando novamente!`);
        }
    });
}

exports.config = {
    name: 'config',
    aliases: [],
    category: 'config'
}
