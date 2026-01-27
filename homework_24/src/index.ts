import express, { Request, Response } from 'express'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Привет')
})

app.post('/data', (req: Request, res: Response) => {
  const body = req.body
  res.json({
    message: 'Данные успешно получены!',
    received: body,
  })
})

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`)
})
