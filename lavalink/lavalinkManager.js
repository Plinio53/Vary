const { PlayerManager } = require('discord.js-lavalink')
const { EventEmitter } = require('events')
let nodes = require('../lavalinkNodes.json').hosts
nodes = nodes.map(() => {
  let obj = {}
  obj.host = process.env.LAVAIP
  obj.port = '8080'
  obj.password = process.env.LAVAPW
  return obj
})

class Player extends EventEmitter {
  constructor (player) {
    super()
    this.player = player
    this.queue = []
    this.nowPlaying = ''
  }
  play (query) {
    return getSongs(this.player.node, `ytsearch:${query}`).then(a => {
      if (!a[0]) return null
      this._addToQueue(a[0])
      return a[0].info
    })
  }
  skip () {
    let nextSong = this.queue.shift()
    if (!nextSong) return
    this.player.play(nextSong.track)
    this.emit('nowPlaying', nextSong)
  }
  setVolume (val) {
    if (val > 100) val = 100
    return this.player.volume(val)
  }
  seek (pos) {
    return this.player.seek(pos)
  }
  pause () {
    return this.player.paused ? this.player.resume() : this.player.pause()
  }
  _addToQueue (track) {
    if (!this.player.playing && !this.player.paused) {
      return this._play(track)
    }
    return this.queue.push(track)
  }
  _play (track) {
    this.player.on('end', (data) => {
      if (data.reason === 'REPLACED') return console.log('replaced')
      let nextSong = this.queue.shift()
      if (!nextSong) return
      this.player.play(nextSong.track)
      this.emit('playingNow', nextSong)
    })
    this.player.play(track.track)
    return this.emit('playingNow', track)
  }
}

module.exports = class LavalinkManager {
  constructor (client) {
    this.client = client
    this.manager = new PlayerManager(client, nodes, {
      shards: 1
    })
  }
  getBestHost () {
    return this.manager.nodes.array()[Math.floor(Math.random() * nodes.length)]
  }
  async join (channel) {
    return new Player(await this.manager.join({ channel: channel, guild: this.client.channels.get(channel).guild.id, host: this.getBestHost().host }, { selfdeaf: true }))
  }
}

async function getSongs (node, search) {
  const fetch = require('node-fetch')
  const { URLSearchParams } = require('url')
  const params = new URLSearchParams()
  params.append('identifier', search)

  return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } }).then(res => res.json()).then(data => data.tracks).catch(err => {
    console.error(err)
    return null
  })
}
