const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./vary.js', {
    token: process.env.TOKEN,
    totalShards: 1
  });

manager.spawn();
manager.on('launch', shard => console.log(`Shard ${(shard.id + 1)} inciada com sucesso!`));