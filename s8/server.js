const express = require('express')
const bodyParser = require('body-parser')

const kittenRouter = require('./routers/kitten-router')

const app = express()

app.locals.kittens = [{
  id: 1,
  name: 'some name',
  color: 'some color',
  weight: 4
}]

app.use((req, res, next) => {
  // res.status(401).json({ message: 'not allowed here' })
  console.log(`${req.method} ${req.url}`)
  next()
})
app.use((req, res, next) => {
 if (req.headers['kitten-secret'] === 'supersecret') {
   next()
 } else {
   res.status(401).json({ message: 'you need the secret' })
 }
})
app.use(bodyParser.json())

app.use('/kitten-api', kittenRouter)

app.listen(8080)