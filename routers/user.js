const express = require('express')
const userrouter = express.Router()
const helpers = require('../middleware/routehelper')

// API Access MIDDLEWARES
const apiAccessCheck = require('../middleware/apiaccess').validateToken;

userrouter.post('/register', async (req, res) => {
    let apires = await helpers.register(req.body);
    return res.status(200).json(apires);
})

userrouter.post('/login', async (req, res) => {
    let apires = await helpers.login(req.body);
    return res.status(200).json(apires);
})

userrouter.get('/info', apiAccessCheck, async (req, res) => {
    let apires = await helpers.userinfo(req.body);
    return res.status(200).json(apires);
})

module.exports = userrouter