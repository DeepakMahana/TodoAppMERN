const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const log = require('./middleware/log')
const app = express()

// Load env from file for dev. Set NODE_ENV in your bashrc or zshrc.
if (process.env.NODE_ENV === 'development') {
  require('env2')('./devenv.json')
}

// Connect to MongoDB
const options = {
  poolSize: 15, // Maintain up to 15 socket connections
  socketTimeoutMS: 1000, // Close sockets after 5 minute of inactivity
  connectTimeoutMS: 1000,
  family: 4, // Use IPv4, skip trying IPv6
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const DB_URI = process.env.MONGO_URI_MLAB;

mongoose.connect(DB_URI, options)
      .then(() => log(`MongoDB Connected ${DB_URI}`))
      .catch(err => log(`MongoDB connect err: ${err}`, true, true));

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors())

// Routers
const userrouter = require('./routers/user')
app.use('/api/user', userrouter)
const todorouter = require('./routers/todo')
app.use('/api/todo', todorouter)

const port = process.env.SERVICE_PORT || 5000

app.listen(port, () => {
  log(`REST serving on port ${port}`.green.bold)
})
