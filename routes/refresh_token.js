
const router = require('express').Router()
const { utils } = require('../utils')
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env
const btoa = require('btoa')
const axios = require('axios')

/**
 * API for login to discord/refresh_token
 * @route POST v1/discord/refresh_token
 * @group DISCORD
 * @returns {object} 200
 * @returns {object} 401 - Unauthorized or Not Authorized
 */
router.get('/', async (req, res, next) => {
  try {
    const { refresh_token } = req.query;
    if(!refresh_token) throw new Error('no-refresh-token-provided')

    const creds = btoa(`${DISCORD_CLIENT_ID}:${DISCORD_CLIENT_SECRET}`)
    const body = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    })

    const response = await axios.default.post('https://discord.com/api/v10/oauth2/token', 
      body,
      {
        headers: {
          Authorization: `Basic ${creds}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).catch(e => { 
        console.log(`error`, JSON.stringify(e.response.data))
        throw(JSON.stringify(e.response.data)) 
      })

    res.send(utils.success(`Data received`, response.data)).status(200)
  } catch (err) {
    res.status(401).send(utils.failed(err, []))
  }
});

module.exports = router