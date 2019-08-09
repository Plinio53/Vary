const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./vary.js', {
    token: process.env.TOKEN,
  });

manager.spawn(1);
manager.on('launch', shard => console.log(`Shard ${shard.id} inciada com sucesso!`));