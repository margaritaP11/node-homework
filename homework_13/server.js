import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

import { Publisher } from './models/Publisher.js'
import { Magazine } from './models/Magazine.js'
import { Tag } from './models/Tag.js'
import { Article } from './models/Article.js'

const app = express()
app.use(express.json())

const mongo_URI = process.env.MONGO_URI
// подключение к монгодб

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Успешное подключение к базам данных'))
  .catch((err) => console.error('Ошибка подключения', error))

app.get('/', (req, res) => {
  res.send('Сервер работает и подключен к базам')
})

// Связ один ко многим (Publisher -> Magazine)

// Создаем издателя

app.post('/publishers', async (req, res) => {
  try {
    const publischer = await Publisher.create(req.body)
    res.status(201).json(publischer)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании издателя', error })
  }
})
// Сщздаем журнал который привязаный к издателю
app.post('/magazines', async (req, res) => {
  try {
    const magazine = await Magazine.create(req.body)
    res.status(201).json(magazine)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании журнала', error })
  }
})
// Получать журнал с данными издателя
app.get('/magazines/:id', async (req, res) => {
  try {
    const magazine = await Magazine.findById(req.params.id).populate(
      'publisher'
    )
    if (!magazine) {
      return res.status(404).json({ message: 'Журнал не найден' })
    }
    res.json(magazine)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении журнала', error })
  }
})

//Связь многие ко многим (Tag <-> Article)

app.post('/tags', async (req, res) => {
  try {
    const tag = await Tag.create(req.body)
    res.status(201).json(tag)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании тега', error })
  }
})
app.post('/articles', async (req, res) => {
  try {
    const article = await Article.create(req.body)
    res.status(201).json(article)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании статьи', error })
  }
})
// Двух стороння связь
app.post('/articles/:articleId/add-tag/:tagId', async (req, res) => {
  try {
    const { articleId, tagId } = req.params
    const article = await Article.findById(articleId)
    const tag = await Tag.findById(tagId)

    if (!article || !tag) {
      return res.status(404).json({ message: 'Статья или тег не найдены' })
    }
    // Добавляетья ссылка друг на друга если ее нет
    if (!article.tags.includes(tag._id)) {
      article.tags.push(tag._id)
    }

    if (!tag.articles.includes(article._id)) {
      tag.articles.push(article._id)
    }

    await article.save()

    await tag.save()

    res.json({ message: 'Тег привязан к статье', article, tag })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при привязании тега к статье' })
  }
})

// Что бы получить статью с тегами
app.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('tags')
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' })
    }
    res.json(article)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении статьи', error })
  }
})
// Получить тег со статьями
app.get('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).populate('articles')
    if (!tag) {
      return res.status(404).json({ message: 'Тег не найдет' })
    }
    res.json(tag)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении тега', error })
  }
})

const PORT = process.env.PORT || 3000

app.listen(process.env.PORT, () => {
  console.log(`Cервер запущен на поту ${PORT}`)
})
