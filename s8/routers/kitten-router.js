const express = require('express')
const kittenController = require('./controllers/kitten-controller')

const router = express.Router()

router.get('/kittens', kittenController.getKittens)

router.post('/kittens', kittenController.addKitten)
router.get('/kittens/:id', kittenController.getKitten)

router.put('/kittens/:id', kittenController.updateKitten)

router.delete('/kittens/:id', kittenController.deleteKitten)

module.exports = router