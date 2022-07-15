
const router = require('express').Router()
const { utils } = require('../utils')
const { DISCORD_CLIENT_ID, DISCORD_REDIRECT } = process.env

/**
 * API for login to discord
 * @route POST v1/discord/login
 * @group DISCORD
 * @returns {object} 200
 * @returns {object} 401 - Unauthorized or Not Authorized
 */
router.get('/', async (req, res, next) => {
  try {
    // https://discord.com/api/oauth2/authorize?client_id=910897951012978769&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fv1%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email
    const redirect = encodeURIComponent(DISCORD_REDIRECT);
    const url = `https://discordapp.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    res.redirect(url)
  } catch (err) {
    res.status(401).send(utils.failed(err, []))
  }
});

module.exports = router