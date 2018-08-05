const express = require('express')
const bodyParser = require('body-parser')

const {
  mongoose
} = require('./db/mongoose')
const {
  User
} = require('./model/user')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/users', async(req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email
    })
    const addedUser = await user.save()
    res.send(addedUser)
  }catch(e){
    res.status(400).send(e);
  }
})

app.listen(port, () => console.log(`Up and running on port ${port}`))
