const Discord = require("discord.js")

module.exports = async (vary, message, oldMessage, newMessage) => {
    if (oldMessage === newMessage) return
    vary.emit("message", newMessage)

  }  