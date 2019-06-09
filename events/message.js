const Discord = require("discord.js")
const config = require("../config.json")
const database = require("../database.js")

module.exports = async (vary, message, args, member) => {
    if(message.channel.name === "🔖│sugestões"){
        await message.react('✅')
        await message.react('❌')
    }
    if(message.author.bot) return;
    if(message.content.includes("discord.gg/")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            return  message.reply(":x: **Você não pode divulgar outros servidores de Discord**");
        }
    };

    let mention = [`<@${vary.user.id}>`, `<@!${vary.user.id}>`]
    mention.find(mention => {
        if(message.content === mention) {
            let embed = new Discord.RichEmbed()
            .setColor('#36393e')
            .setDescription(`Meu prefixo é: \`${config.prefix}\`, Para usar meus comando use ${config.prefix}ajuda`)
            .setFooter(`Fui criado por ${vary.users.get('375627393773207554').tag}!`)
            message.channel.send(embed);
        }
    });

    database.Users.findOne({
        userID: message.author.id
    }, function(erro, usuario) {
        if(usuario) { 
            let prefix = [`<@${vary.user.id}> `, `<@!${vary.user.id}> `, config.prefix, 'vary ', 'Vary ']
            prefix.find(prefix=>{
                if (!message.content.startsWith(prefix)) return;
                try {
                    let args = message.content.slice(prefix.length).trim().split(" ")            
                    let cmd = args.shift().toLowerCase()
                    let comando = vary.commands.get(cmd) || vary.commands.get(vary.aliases.get(cmd))
                    if(comando) {
                        ///Se o usuário estiver banido do bot ele vai enviar uma mensagem.
                        if(!usuario.Ban || usuario.Criador) {
                            comando.run(vary, message, args);
                        } else {
                            message.channel.send(`Lamento mais você está banido de meus comandos`)
                        }            
                    }                } catch (err) {
                    console.error(err)
                }
            });
        } else if(!usuario) {
            var saveU = new database.Users({
                userID: message.author.id
            });
            saveU.save()              
        }
    });
}
