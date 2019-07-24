const Discord = require('discord.js');

exports.run = ({vary, message, args}, t) => {
    let sentence = args.join(' ');
    if (!sentence) return message.reply('Você precisa dizer algo...');
    
    let faces=["(・`ω´・)",";;w;;","owo","UwU",">w<","^w^"];

    let newSentence = sentence.replace(/[lr]/g, 'w');
      newSentence = newSentence.replace(/(?:r|l)/g, "w");
      newSentence = newSentence.replace(/(?:R|L)/g, "W");
      newSentence = newSentence.replace(/n([aeiou])/g, 'ny$1');
      newSentence = newSentence.replace(/N([aeiou])/g, 'Ny$1');
      newSentence = newSentence.replace(/N([AEIOU])/g, 'NY$1');
      newSentence = newSentence.replace(/ove/g, "uv");
      newSentence = newSentence.replace(/\!+/g, " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");
    message.channel.send(newSentence);
}

exports.config = {
    name: 'owofy',
    aliases: [],
    category: 'fun'
}