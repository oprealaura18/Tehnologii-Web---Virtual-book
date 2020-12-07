// const getKittens = (req, res) => {
//  res.status(200).json(res.app.locals.kittens)
// }

const getKittens = (req, res) => {
 let results = res.app.locals.kittens
 if (req.query.filter) {
   results = results.filter(e => e.name.indexOf(req.query.filter) !== -1)
 }
 let pageSize = 10
 if (req.query.pageSize) {
   pageSize = parseInt(req.query.pageSize)
 }
 if (req.query.pageNo) {
   let pageNo = parseInt(req.query.pageNo)
   results = results.slice(pageSize * pageNo, pageSize * (pageNo + 1))
 }
 res.status(200).json(results)
}

const addKitten = (req, res) => {
 const id = req.body.id
 const existingKitten = res.app.locals.kittens.find(e => e.id === id)
 if (existingKitten) {
   res.status(400).json({ message: 'cannot add existing kitten' })
 } else {
   res.app.locals.kittens.push(req.body)
   res.status(201).json({ message: 'created' })
 }
}

const getKitten = (req, res) => {
 const id = parseInt(req.params.id)
 const kitten = res.app.locals.kittens.find(e => e.id === id)
 if (kitten) {
   res.status(200).json(kitten)
 } else {
   res.status(404).json({ message: 'kitten not found' })
 }
}

const updateKitten = (req, res) => {
 const id = parseInt(req.params.id)
 const kittenIndex = res.app.locals.kittens.findIndex(e => e.id === id)
 if (kittenIndex !== -1) {
   res.app.locals.kittens[kittenIndex].name = req.body.name
   res.app.locals.kittens[kittenIndex].color = req.body.color
   res.app.locals.kittens[kittenIndex].weight = req.body.weight
   res.status(202).json({ message: 'accepted' })
 } else {
   res.status(404).json({ message: 'kitten not found' })
 }
}

const deleteKitten = (req, res) => {
 const id = parseInt(req.params.id)
 const kittenIndex = res.app.locals.kittens.findIndex(e => e.id === id)
 if (kittenIndex !== -1) {
   res.app.locals.kittens.splice(kittenIndex, 1)
   res.status(202).json({ message: 'accepted' })
 } else {
   res.status(404).json({ message: 'kitten not found' })
 }
}

module.exports = {
 getKittens,
 addKitten,
 getKitten,
 updateKitten,
 deleteKitten
}