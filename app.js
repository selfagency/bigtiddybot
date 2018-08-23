#!/usr/bin/env node

require('envkey')
const EmojiConvertor = require('emoji-js')
const emojis = require('emoji.json')
const Mastodon = require('mastodon-api')

const M = new Mastodon({
  access_token: process.env.ACCESS_TOKEN,
  api_url: 'https://bofa.lol/api/v1/'
})

async function post() {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]
  const status = `big tiddy ${emoji.name.toLowerCase()}\n\n     ­­­${
    emoji.char
  }\n  ​​:boob:​:boob:`
  console.log(status)
  const res = await M.post('statuses', { status })
  if (/error/.test(res.data)) console.log(res.data)
  setTimeout(async () => {
    await post()
  }, 3600000)
}

;(async () => {
  await post()
})()
