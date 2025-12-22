// импорт MongoClient
/* MongoClient потрібен тільки якщо ти працюєш без Mongoose
MongoClient — це офіційний низькорівневий драйвер MongoDB. Він дозволяє:
підключатися до бази
виконувати CRUD-запити вручну
працювати з колекціями без схем
робити запити через db.collection("users").find() */

import { MongoClient } from 'mongodb'

// импорт дотэнв что бы читать пересенные из файла

import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI

// Создаем клиент монгодб
const client = new MongoClient(uri)
// Coздаем функцию для подключения к базе данных

export async function connectDB() {
  try {
    // Пытаемся подключиться к монго
    await client.connect()
    console.log('Подключение успешно')
    // Возвращем обьект баз данных
    return client.db()
  } catch (error) {
    console.log('Ошибка при подключении', error)
    process.exit(1) // останавливает приложение если нет подключения
  }
}
