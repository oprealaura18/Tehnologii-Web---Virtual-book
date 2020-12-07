const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
 
const sequelize = new Sequelize('sequelize_tests', 'root', 'Teodora17416', {
  dialect: 'mysql'
})
 
const Bookshelf = sequelize.define('bookshelf', {
  row: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 20
    }
  },
  column: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 3]
    }
  }
})
 
const Book = sequelize.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  genre: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: [ 'HISTORY', 'SF', 'FANTASY' ]
  }
})
 
Bookshelf.hasMany(Book)
 
const app = express()
app.use(bodyParser.json())
 
app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})
 
// get /bookshelves?filter=A&page=1&pageSize=3
app.get('/bookshelves', async (req, res, next) => {
  const query = {
    where: {}
  }
  if (req.query.filter) {
    query.where.column = {
      [Op.like]: `%${req.query.filter}%`
    }
  }
  let pageSize = 10
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }
  if (req.query.page) {
    const page = parseInt(req.query.page)
    query.limit = pageSize
    query.offset = page * pageSize
  }
 
  try {
    const bookshelves = await Bookshelf.findAll(query)
    res.status(200).json(bookshelves)
  } catch (err) {
    next(err)
  }
})
 
app.post('/bookshelves', async (req, res, next) => {
  try {
    await Bookshelf.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})
 
app.get('/bookshelves/:bsid', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid)
    if (bookshelf) {
      res.status(200).json(bookshelf)
    } else {
      res.status(404).json({ message: 'not found '})
    }
  } catch (err) {
    next(err)
  }
})
 
app.put('/bookshelves/:bsid', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid)
    if (bookshelf) {
      await bookshelf.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found'})
    }
  } catch (err) {
    next(err)
  }
})
 
app.delete('/bookshelves/:bsid', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid)
    if (bookshelf) {
      await bookshelf.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found '})
    }
  } catch (err) {
    next(err)
  }
})
 
app.get('/bookshelves/:bsid/books', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid, {
      include: [ Book ]
    })
    if (bookshelf) {
      res.status(200).json(bookshelf.books)
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})
 
app.post('/bookshelves/:bsid/books', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid)
    if (bookshelf) {
      const book = new Book(req.body)
      book.bookshelfId = bookshelf.id
      await book.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})
 
app.get('/bookshelves/:bsid/books/:bid', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid)
    if (bookshelf) {
      const books = await bookshelf.getBooks({
        id: req.params.bid
      })
      const book = books.shift()
      if (book) {
        res.status(200).json(book)
      } else {
        res.status(404).json({ message: 'not found '})
      }
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})
 
app.put('/bookshelves/:bsid/books/:bid', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid)
    if (bookshelf) {
      const books = await bookshelf.getBooks({
        id: req.params.bid
      })
      const book = books.shift()
      if (book) {
        book.title = req.body.title
        book.genre = req.body.genre
        await book.save()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found '})
      }
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})
 
app.delete('/bookshelves/:bsid/books/:bid', async (req, res, next) => {
  try {
    const bookshelf = await Bookshelf.findByPk(req.params.bsid)
    if (bookshelf) {
      const books = await bookshelf.getBooks({
        id: req.params.bid
      })
      const book = books.shift()
      if (book) {
        await book.destroy()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found '})
      }
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})
 
app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})
 
app.listen(8080)