const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const log = require('./middleware/log')

const app = express()

// Load env from file for dev. Set NODE_ENV in your bashrc or zshrc.
if (process.env.NODE_ENV === 'development' || 'production') {
  require('env2')('./devenv.json')
}

// Connect to MongoDB
const mongo = require('./middleware/mongo');

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors())

// Serve static files from the React App
app.use(express.static(path.join(__dirname, 'client/build')));

// Routers
const userrouter = require('./routers/user')
app.use('/api/user/', userrouter)
const todorouter = require('./routers/todo')
const { patch } = require('./routers/user')
app.use('/api/todo/', todorouter)

// Catch all handler for react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000
const server = http.createServer(app)
server.listen(port, () => {
  log(`REST serving on port ${port}`.green.bold)
})
