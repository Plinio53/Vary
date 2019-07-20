const Discord = require("discord.js")
const config = require("../config.json")
const database = require("../database.js")
const fs = require('fs')
const i18next = require('i18next')
const translationBackend = require('i18next-node-fs-backend')
module.exports = async (vary, message, args, member) => {
    if(message.channel.name === "🔖│sugestões"){
        await message.react('✅')
        await message.react('❌')
    }
    if(message.author.bot) return;

    if(message.content === `<@${vary.user.id}>` || message.content === `<@!${vary.user.id}>`) {
        let embed = new Discord.RichEmbed()
        .setColor('#36393e')
        .setDescription(`Meu prefixo é: \`${config.prefix}\`, Para usar meus comando use ${config.prefix}ajuda`)
        .setFooter(`Fui criado por ${vary.users.get('375627393773207554').tag}!`)
        
        message.channel.send(embed);
    }

    database.Users.findOne({
        userID: message.author.id
    }, function(erro, usuario) {
        if(usuario) { 
            let prefix = [`<@${vary.user.id}> `, `<@!${vary.user.id}> `, config.prefix, 'vary ', 'Vary ']
            prefix.find(prefix=>{
                database.Guilds.findOne({
                    _id: message.guild.id
                }, function (err, server) {
                    if (server) {
                        if(server.AntiInvite){
                            if(message.content.includes("discord.gg/") && !message.member.hasPermission('ADMINISTRATOR')) {
                                    message.delete().then(() => message.reply(t("errors.antiDiv")))                              
                                
                            };
                        }
                        if (!message.content.startsWith(prefix)) return;
                        try {
                            let t;
                            const setFixedT = function (translate) {
                                t = translate
                            }
                            const language = (server && server.Lang) || 'pt-BR'
                            setFixedT(i18next.getFixedT(language))
                            return new Promise(async (resolve, reject) => {
                                i18next.use(translationBackend).init({
                                    ns: ['commands', 'embeds', 'errors', 'permissions'],
                                    preload: await fs.readdirSync("./locales/"),
                                    fallbackLng: 'pt-BR',
                                    backend: {
                                        loadPath: './locales/{{lng}}/{{ns}}.json'
                                    },
                                    interpolation: {
                                        escapeValue: false
                                    },
                                    returnEmptyString: false
                                }, (err, f) => {
                                    if (f) {
                                        let args = message.content.slice(prefix.length).trim().split(" ")            
                                        let cmd = args.shift().toLowerCase()
                                        let comando = vary.commands.get(cmd) || vary.commands.get(vary.aliases.get(cmd))
                                        if(comando) {
                                            if(!usuario.Ban || usuario.Criador) {
                                                comando.run({vary, message, args}, t);
                                            } else {
                                                message.channel.send(t(errors.botban))
                                            }            
                                        }
                                    }
                                })
                            })           
                        } catch (err) {
                            console.error(err)
                        }
                        
                    } else {
                        let server = new database.Guilds({
                            _id: message.guild.id
                        })
                        server.save()
                    }
                })
            });
        } else {
            var saveU = new database.Users({
                userID: message.author.id
            });
            saveU.save()              
        }
    });
}
