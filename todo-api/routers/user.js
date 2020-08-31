const express = require('express')
const userrouter = express.Router()
const helpers = require('../middleware/routehelper')
// const MISC = require("../constant/misc");

// MIDDLEWARES
// const MIDDLEWARE = require('../middlewares/middleware');

userrouter.post('/register', async (req, res) => {
    let apires = await helpers.register(req.body);
    return res.status(200).json(apires);
})

userrouter.post('/login', async (req, res) => {
    let apires = await helpers.login(req.body);
    return res.status(200).json(apires);
})

module.exports = userrouter