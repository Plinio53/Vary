const Discord = require('discord.js')


exports.run = async ({vary, message, args}, t) => {    
    const regex = /[!*();,:@&=+$.\/?%#[\]]/g;

    let langs = {
        'af': 'Afrikaans',
        'sq': 'Albanian',
        'am': 'Amharic',
        'ar': 'Arabic',
        'hy': 'Armenian',
        'az': 'Azerbaijani',
        'eu': 'Basque',
        'be': 'Belarusian',
        'bn': 'Bengali',
        'bs': 'Bosnian',
        'bg': 'Bulgarian',
        'my': 'Burmese',
        'ca': 'Catalan',
        'ny': 'Chichewa (Chewa, Nyanja)',
        'zh': 'Chinese',
        'hr': 'Croatian',
        'cs': 'Czech',
        'da': 'Danish',
        'nl': 'Dutch',
        'en': 'English',
        'eo': 'Esperanto',
        'et': 'Estonian',
        'fi': 'Finnish',
        'fr': 'French',
        'gl': 'Galician',
        'gd': 'Gaelic (Scottish)',
        'ka': 'Georgian',
        'de': 'German',
        'el': 'Greek',
        'gu': 'Gujarati',
        'ht': 'Haitian Creole',
        'ha': 'Hausa',
        'he': 'Hebrew',
        'hi': 'Hindi',
        'hu': 'Hungarian',
        'is': 'Icelandic',
        'ig': 'Igbo',
        'id': 'Indonesian',
        'in': 'Indonesian',
        'ga': 'Irish',
        'it': 'Italian',
        'ja': 'Japanese',
        'jv': 'Javanese',
        'kn': 'Kannada',
        'kk': 'Kazakh',
        'km': 'Khmer',
        'ky': 'Kyrgyz',
        'ko': 'Korean',
        'ku': 'Kurdish',
        'lo': 'Lao',
        'la': 'Latin',
        'lv': 'Latvian (Lettish)',
        'lt': 'Lithuanian',
        'lg': 'Luxembourgish',
        'mk': 'Macedonian',
        'mg': 'Malagasy',
        'ms': 'Malay',
        'ml': 'Malayalam',
        'mt': 'Maltese',
        'mi': 'Maori',
        'mr': 'Marathi',
        'mh': 'Marshallese',
        'mo': 'Moldavian',
        'mn': 'Mongolian',
        'ne': 'Nepali',
        'no': 'Norwegian',
        'nb': 'Norwegian bokmål',
        'nn': 'Norwegian nynorsk',
        'ps': 'Pashto (Pushto)',
        'fa': 'Persian (Farsi)',
        'pl': 'Polish',
        'pt': 'Portuguese',
        'pa': 'Punjabi (Eastern)',
        'ro': 'Romanian',
        'ru': 'Russian',
        'sm': 'Samoan',
        'sr': 'Serbian',
        'sh': 'Serbo-Croatian',
        'st': 'Sesotho',
        'sn': 'Shona',
        'sd': 'Sindhi',
        'si': 'Sinhalese',
        'sk': 'Slovak',
        'sl': 'Slovenian',
        'so': 'Somali',
        'es': 'Spanish',
        'su': 'Sundanese',
        'sw': 'Swahili (Kiswahili)',
        'sv': 'Swedish',
        'tl': 'Tagalog',
        'tg': 'Tajik',
        'ta': 'Tamil',
        'te': 'Telugu',
        'th': 'Thai',
        'tr': 'Turkish',
        'uk': 'Ukrainian',
        'ur': 'Urdu',
        'uz': 'Uzbek',
        'vi': 'Vietnamese',
        'cy': 'Welsh',
        'fy': 'Western Frisian',
        'xh': 'Xhosa',
        'yi': 'Yiddish',
        'ji': 'Yiddish',
        'yo': 'Yoruba',
        'zu': 'Zulu',
    };

    if (args == 'list') {

        let langEntries = Object.entries(langs);
        let listOfDLangs = ``;

        for (const [short, long] of langEntries) {
            listOfDLangs += `${long} - ${short}\n`;
        }

        let embed1 = new Discord.RichEmbed()
            .setColor(client.config.embedColor)
            .setTitle('Lista de linguagens:')
            .setDescription(listOfDLangs)
            .addField('Como usar: ', '`v;translate <linguagem original da mensagem>-<linguagem para qual você quer traduzir a mensagem> <mensagem>`')
            .setTimestamp();

        message.channel.send(embed1);
        return;
    } else {

        let sourceLang = args[0] + args[1];
        let targetLang = args[3] + args[4];

        if (!langs.hasOwnProperty(sourceLang))
            return message.channel.send(`Essa linguagem não existe...`);
        if (args[2] !== "-")
            return message.channel.send('Uso correto: `v;translate <linguagem original da mensagem>-<linguagem para qual você quer traduzir a mensagem> <mensagem>`');
        if (!langs.hasOwnProperty(targetLang))
            return message.channel.send(`Essa linguagem não existe...`);
        if (words == "")
            return message.channel.send("Qual será a mensagem que eu irei traduzir?");

        let words2translate = words.join(" ").toLowerCase().replace(regex, "");
        let link = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURI(words2translate)}`;

        request.get(link, (error, response, body) => {
            if (error)
                console.log(error);

            try {
                let translation = JSON.parse(body);
                let embed = new Discord.RichEmbed()
                    .setDescription(translation[0][0][0])
                    .setColor(client.config.embedColor);
                message.channel.send(`Traduzido de ${langs[sourceLang]} para ${langs[targetLang]}:`);
                message.channel.send(embed);
            }
            catch (err) {
                console.log(err);
                message.channel.send("Ocorreu um erro... Contacte o meu suporte");
            }
        });
    }
}

exports.config = {
    name: 'translate',
    aliases: ['traduzir'],
    category: 'random'
}