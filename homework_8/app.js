import express from 'express'
import { Sequelize } from 'sequelize'
import db from './models/index.js'

const app = express()
app.use(express.json())

const { Book } = db

//Получаю книги

app.get('/books', async (req, res) => {
  const books = await Book.findAll()
  res.json(books)
})

//Добавляю книгу
app.put('/books/:id', async (req, res) => {
  const { title, author, year } = req.body
  const book = await Book.create({ title, author, year })
  res.json(book)
})

//Обновляю книгу
app.put('/books/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, year } = req.body
  await Book.update({ title, author, year }, { where: { id } })
  res.json({ message: 'Book update' })
})

// Удаляю книгу

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params
  await Book.destroy({ where: { id } })
  res.json({ message: 'Book deleted' })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
