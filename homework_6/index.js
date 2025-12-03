import express from 'express'
import pool from './db'
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  try {
    res.status(200).send('Hello, World!')
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

app.post('/', (req, res) => {
  try {
    const data = req.body
    if (!data || !data.name) {
      return res.status(400).send('Bad Request')
    }
    res.status(200).send(`Data received: ${JSON.stringify(data)}`)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
})

app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT*FROM products')
    res.json(rows)
  } catch (err) {
    res.status(500).send('Error fetching products')
  }
})

app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body
    if (!name || typeof name !== 'string') {
      return res
        .status(400)
        .send('Bad Request:"name" is required and must be a string')
    }
    if (price === undefined || isNaN(Number(price))) {
      return res
        .status(400)
        .send('Bad Request: "price"is required and must be a number')
    }
    const [result] = await pool.query(
      'INSERT INTO products (name, price) VALUES (?,?)',
      [name, Number(price)]
    )
    res.status(201).json({ ok: true, id: result.insertId })
  } catch (err) {
    res.status(500).send('Error adding product')
  }
})

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`)
})
