const router = require('express').Router()

router.use(`/login`, require('./login'))
router.use(`/token`, require('./token'))
router.use(`/refresh_token`, require('./refresh_token'))
router.use(`/@me`, require('./@me'))
router.use(`/@config`, require('./@config'))

module.exports = router
