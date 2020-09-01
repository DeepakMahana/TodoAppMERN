const express = require('express')
const todorouter = express.Router()
const helpers = require('../middleware/routehelper')

// API Access MIDDLEWARES
const apiAccessCheck = require('../middleware/apiaccess').validateToken;
todorouter.use(apiAccessCheck)

todorouter.post('/addtodo', async (req, res, next) => {
    let apires = await helpers.addTodo(req.body);
    return res.status(200).json(apires);
})

todorouter.post('/deletetodo', async (req, res, next) => {
    let apires = await helpers.deleteTodo(req.body);
    return res.status(200).json(apires);
})

todorouter.post('/addsubtask', async (req, res, next) => {
    let apires = await helpers.addSubTask(req.body);
    return res.status(200).json(apires);
})

todorouter.post('/deletesubtask', async (req, res, next) => {
    let apires = await helpers.deleteSubTask(req.body);
    return res.status(200).json(apires);
})

module.exports = todorouter