const cors = require('cors')
const express = require('express')
const compression = require('compression')
const app = express()

const path = require('path')
const api = require('./routes')
const { PORT } = process.env
const { utils } = require('./utils')

app.use(express.static('static'))
app.use(cors())
app.use(compression({ filter: shouldCompress }))
app.use(express.json())
app.use((req, res, next) => {
    req.log.info({ req })
    res.on('finish', () => req.log.info({ res }))
    next()
})
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) { res.status(400).send(utils.failed("Bad Request")) } else { next() }
})

//// VueRouter
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'))
})

//// ExpressRouter
app.use('/v1', api)

//// Start App
app.listen(process.env.PORT || PORT, function () {
    console.info("🚀 api running in port ' + port, 'server", this.address().port, app.settings.env);
});

// method
function shouldCompress(req, res) {
    if (req.headers['x-no-compression'])
        return false

    return compression.filter(req, res)
}