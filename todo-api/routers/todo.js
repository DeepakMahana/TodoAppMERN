const express = require('express')
const todorouter = express.Router()
const helpers = require('../middleware/routehelper')

// API Access MIDDLEWARES
const apiAccessCheck = require('../middleware/apiaccess').validateToken;
todorouter.use(apiAccessCheck)

todorouter.post('/addtodo', async (req, res, next) => {
    let apires = await helpers.addtodo(req.body);
    return res.status(200).json(apires);
})

todorouter.post('/deletetodo', async (req, res, next) => {
    let apires = await helpers.deletetodo(req.body);
    return res.status(200).json(apires);
})

module.exports = todorouter