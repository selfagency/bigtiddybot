require('now-env')

const emojis = require('emoji.json')
const Mastodon = require('mastodon-api')

const M = new Mastodon({
  access_token: process.env.ACCESS_TOKEN,
  api_url: 'https://bofa.lol/api/v1/'
})

async function post() {
  try {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const status = `big tiddy ${emoji.name.toLowerCase()}\n\n​    ${
      emoji.char
    }\n​ :boob:​:boob:`
    const res = await M.post('statuses', { status })
    return status
    if (/error/.test(res.data)) throw new Error(res.data)
  } catch (err) {
    throw err
  }
}

module.exports = async (req, res) => {
  const status = await post()
  res.end(status)
}
