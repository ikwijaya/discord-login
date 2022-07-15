
const router = require('express').Router()
const { utils } = require('../utils')
const axios = require('axios')

/**
 * API for login to discord/@me
 * @route POST v1/discord/@me
 * @group DISCORD
 * @returns {object} 200
 * @returns {object} 401 - Unauthorized or Not Authorized
 */
router.get('/', async (req, res, next) => {
  try {
    const { token_type, access_token } = req.query;
    if(!token_type || !access_token) throw new Error('no-token-provided')

    const response = await axios.default.get(`https://discord.com/api/users/@me`, {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    })
    .catch(e => { 
      console.log(`error`, JSON.stringify(e.response.data))
      throw(JSON.stringify(e.response.data)) 
    });

    res.send(utils.success(`Data received`, response.data)).status(200)
  } catch (err) {
    res.status(401).send(utils.failed(err, []))
  }
});

module.exports = router