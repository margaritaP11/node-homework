import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())
import Category from './models/Category.js'
import Product from './models/Product.js'

// подключаемся к монго

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connecrion error:', err))

// Роуты
// Добавляем категории
app.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: 'Категории не найдены', error })
  }
})
// Добавляем продукты
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
// Получаем все продукты с популейт
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category')
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
