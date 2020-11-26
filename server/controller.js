const fs = require('fs')
const dbfile = './server/db.json'

const Controller = {
  getTodos (req, res) {
    fs.readFile(dbfile, (err, data) => {
      if (err) throw err

      res.send(data)
    })
  },

  putTodos (req, res) {
    fs.writeFile(dbfile, req.body, (err) => {
      if (err) throw err
      console.log('Data written to file')
      res.sendStatus(200)
    })
  }
}

module.exports = Controller
