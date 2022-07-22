
const router = require('express').Router()
const { utils } = require('../utils')
const abi = require('../assets/abi.json')
const { TOKEN_ADDRESS } = process.env

router.get('/', async (req, res, next) => {
  try {
    res.send(utils.success(`load success`, {
      token_address: TOKEN_ADDRESS,
      abi: abi
    }))
  } catch (err) {
    res.status(401).send(utils.failed(err, []))
  }
});

module.exports = router