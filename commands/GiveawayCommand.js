const Discord = require("discord.js"),
const giveaways = require("discord-giveaways"),
const ms = require("ms");

exports.run = async ({vary, message, args}, t) => {
    let status = args[0];
    if(!status){
        return message.channel.send(message.language.get("GIVEAWAY_ERR_STATUS"));
    }

    if(status === "criar" || status === "create"){
        let currentGiveaways = giveaways.fetch().filter((g) => g.guildID === message.guild.id).length;
        if(currentGiveaways > 3){
            return message.channel.send("Você já tem o limite de sorteios criados (3)");
        }
        let time = args[1];
        if(!time){
            return message.channel.send("Você precisa inidicar o tempo do sorteio");
        }
        if(isNaN(ms(time))){
            return message.channel.send("Tempo inválido");
        }
        if(ms(time) > ms("15d")){
            return message.channel.send("O tempo máximo que um sorteio pode durar é 15 dias...")
        }
        let winnersCount = args[2];
        if(!winnersCount){
            return message.channel.send("Quantas pessoas irão ganhar este sorteio");
        }
        if(isNaN(winnersCount) || winnersCount > 10 || winnersCount < 1){
            return message.channel.send("Número de vencedores vai de 1 a 10");
        }
        let prize = args.slice(3).join(" ");
        if(!prize){
            return message.channel.send("Qual será o prémio que eles irão ganhar?"); 
        }
        giveaways.start(message.channel, {
            time: ms(time),
            prize: prize,
            winnersCount: parseInt(winnersCount, 10),
            messages: (t("commands:giveaway-embed"))
        }).then(() => {
            message.channel.send("Sorteio iniciado!");
        });
    } else if(status === "reroll"){
        let messageID = args[1];
        if(!messageID){
            return message.channel.send("Qual é o ID desse sorteio? (ID da mensagem)");
        }
        giveaways.reroll(messageID, (t("commands:giveaway.reroll"))).then(() => {
            return message.channel.send(t("commands:giveaway.reroll"));
        }).catch((err) => {
            return message.channel.send("Nenhum sorteio com o ID que você me forneceu acabou");
        });
    } else if(status === "cancelar" || status === "cancel"){
        let messageID = args[1];
        if(!messageID){
            return message.channel.send("Erro ao cancelar o sorteio");
        }
        giveaways.delete(messageID).then(() => {
            return message.channel.send("Sorteio cancelado");
        }).catch((err) => {
            return message.channel.send("Sorteio não encontrado");
        });
    } else if(status === "terminar" || status === "end"){
        let messageID = args[1];
        if(!messageID){
            return message.channel.send("Erro ao cancelar esse sorteio");
        }
        try {
            giveaways.edit(messageID, {
                setEndTimestamp: Date.now()
            });
            return message.channel.send("Sorteio acabado");
        } catch(e){
            return message.channel.send("Erro ao cancelar esse sorteio");
        }
    } else {
        return message.channel.send("Uso correto: `v;giveaway` \n`criar` \n`reroll` \n`terminar`");
    }

}