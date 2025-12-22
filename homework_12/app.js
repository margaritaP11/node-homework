import express from 'express'

// импортируем функцию для подключения к базам
import { connectDB } from './db/index.js'

// ипорт дотенв для чнения енв
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
dotenv.config()

const app = express()

app.use(express.json())
// основная функция запуска приложения
async function startServer() {
  // подключаюсь к базам данных
  const db = await connectDB()

  //Чтобы колекция была доступна в app
  const productCollection = db.collection('products')

  // Простой тестовый маршрут
  app.get('/', (req, res) => {
    res.send('Сервер работает и подключен к базам данных')
  })

  // GRUD - Маршруты

  // POST
  app.post('/products', async (req, res) => {
    try {
      const newProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      }
      const result = await productCollection.insertOne(newProduct)
      res.status(201).json({ id: result.insertedId, ...newProduct })
    } catch (error) {
      res.status(500).json({ message: 'Oшибка при создании продукта', error })
    }
  })
  // READ - GET / products
  app.get('/products', async (req, res) => {
    try {
      const products = await productCollection.find().toArray()
      res.json(products)
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении продуктов', error })
    }
  })
  //READ ONE - GET/products/:id
  app.get('/products/:id', async (req, res) => {
    try {
      const id = req.params.id
      const product = await productCollection.findOne({
        _id: new ObjectId(id),
      })
      if (!product) {
        return res.status(404).json({ message: 'Продукт не найден' })
      }
      res.json(product)
    } catch (error) {
      res
        .status(500)
        .json({ message: ' Возникла ошибка при получении продукта' })
    }
  })

  //UPDATE - PUT /product/:id
  app.put('/products/:id', async (req, res) => {
    try {
      const id = req.params.id
      const updateData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      }
      const result = await productCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      )
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Продукт не найден' })
      }
      res.json({ message: 'Продукт обновлен' })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка продукта при обновлении', error })
    }
  })
  //DELETE - DELETE /product/:id

  app.delete('/products/:id', async (req, res) => {
    try {
      const id = req.params.id
      const result = await productCollection.deleteOne({
        _id: new ObjectId(id),
      })
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Продукт не найден' })
      }
      res.json({ message: 'Продукт удален' })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении продукта', error })
    }
  })

  app.listen(process.env.PORT, () => {
    console.log(`Cервер запущен: ${process.env.PORT}`)
  })
}
startServer()
