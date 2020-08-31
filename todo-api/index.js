const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const log = require('./middleware/log')
const app = express()

// Load env from file for dev. Set NODE_ENV in your bashrc or zshrc.
if (process.env.NODE_ENV === 'development') {
  require('env2')('./devenv.json')
}

// Connect to MongoDB
const mongo = require('./middleware/mongo');

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors())

// Routers
const userrouter = require('./routers/user')
app.use('/api/user/', userrouter)
const todorouter = require('./routers/todo')
app.use('/api/todo/', todorouter)

const port = process.env.SERVICE_PORT || 3000
const server = http.createServer(app)
server.listen(port, () => {
  log(`REST serving on port ${port}`.green.bold)
})
