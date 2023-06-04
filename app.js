const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser')
const app = express()
//Midlware for 'undefined' in body parsing
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirects.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))

        app.listen(PORT, () => console.log(`started: ${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()


