'use strict'

const express = require('express')
const Controller = require('./controller')
const constants = require('./constants')

const app = express()

// setup CORS
app.use(constants.corsConfig)
// setup use of plaintext payloads
app.use(express.text())

// handle GET requests
app.get('/', Controller.getTodos)

// handle PUT requests
app.put('/', Controller.putTodos)

app.listen(constants.port, () => {
  console.log(`A simple server listening at http://localhost:${constants.port}`)
})
