const Discord = require("discord.js");
const math = require('mathjs');

exports.run = async ({vary, message, args}, t) => {
  let input = args.join(" ");
if (!input) {
   message.reply(t("commands:calc.noArgs"));
   return;
}

const question = args.join(" ");

let answer;
try {
   answer = math.eval(question);
} catch (err) {
   return message.reply(t("errors:mathEvaluationError", {error: err}))
}

const embed = new Discord.RichEmbed()
   .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/31QYTepQomL.png")
   .setColor('RANDOM')
   .addField(t("commands:calc.question"), question, true)
   .addField(t("commands:calc.answer"), answer)

message.channel.send({
   embed
})
}

exports.config = {
    name: 'calc',
    aliases: ['calcular'],
    category: 'random'
}
