const Discord = require("discord.js");

exports.run = ({vary, message, args}, t) => {
    if (message.author.id !== "375627393773207554") return message.channel.send("⛔ **ACCESSO NEGADO**");

    try {
        delete require.cache[require.resolve(`./${args[1]}.js`)];
    } catch (e) {

        return message.channel.send(`Não foi possivel reiniciar o seguinte comando: ${args[1]}.js`);
    }

    message.channel.send(`${args[1]}.js **Foi recarregado com sucesso!**`);

}

exports.config = {
    name: 'reload',
    aliases: [],
    category: 'dev'
}
