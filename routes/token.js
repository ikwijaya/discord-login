
const router = require('express').Router()
const { utils } = require('../utils')
const { 
  DISCORD_CLIENT_ID, 
  DISCORD_CLIENT_SECRET, 
  DISCORD_REDIRECT, 
  DISCORD_REDIRECT_TOKEN 
} = process.env
const btoa = require('btoa')
const axios = require('axios')

/**
 * API for login to token
 * @route POST v1/token
 * @group DISCORD
 * @returns {object} 200
 * @returns {object} 401 - Unauthorized or Not Authorized
 */
router.get('/', async (req, res, next) => {
  try {
    const { code } = req.query;
    if(!code) throw new Error('no-code-provided')

    const creds = btoa(`${DISCORD_CLIENT_ID}:${DISCORD_CLIENT_SECRET}`)
    const body = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: DISCORD_REDIRECT,
      scope: 'identify'
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

    if(response.status == 200 && response.data){
      const qs = await jsonToQs(response.data)
      res.redirect(DISCORD_REDIRECT_TOKEN+'?'+qs)
      return
    } 
    
    res.redirect(DISCORD_REDIRECT_TOKEN)
  } catch (err) {
    res.redirect(DISCORD_REDIRECT_TOKEN)
  }
});

module.exports = router

const jsonToQs = (object = {}) => {
  return new Promise((resolve) => {
    let arr = []
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        arr.push(key+'='+element)
      }
    }

    resolve(arr.join('&'));
  })
}