const Discord = require("discord.js")

module.exports = async (vary) => {

  const LavalinkManager = require('../lavalink/lavalinkManager')
  vary.lavalinkManager = new LavalinkManager(vary)
  console.log('Lavalink iniciado com sucesso!')

  let status = [
      {name: '🎶 música', type: 'LISTENING'},
      {name: `🎬 videos`, type: 'WATCHING'},
      {name: `😜 meu website: https://vary.website/`, type: 'WATCHING'},
      {name: `😢 + 💶 = 😋😘 (https://paypal.me/maidVary)`, type: 'PLAYING'},
     {name: `Fui desenvolvido por ${vary.users.get('375627393773207554').tag}`, type: 'STREAMING', url: 'https://twitch.tv/imdiogo912'},
    {name: `🐦 Me siga no Twitter: @maidVary`, type: 'WATCHING'}

    ];
      console.log( `Carregado...! Olá mundo! Estou em ${vary.guilds.size} servers com ${vary.users.size} users` );

      function setStatus() {
          let randomStatus = status[Math.floor(Math.random() * status.length)];
          vary.user.setPresence({game: randomStatus});
          vary.user.setStatus('online')
      }

      setStatus();
      setInterval(() => setStatus(), 10000); //{1000/1s}\{10000/10s}\{100000/1m}
    }
