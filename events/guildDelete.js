var database = require('../database.js')
exports.run = (vary, guild) => {
    database.Guilds.deleteOne({
        '_id': guild.id
      })
}