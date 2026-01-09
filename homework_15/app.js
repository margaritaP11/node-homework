import express from 'express'

import http from 'http' //нужен для сокет айо

import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

//. Подключение сокетайо к серверу
const io = new Server(server)

// статические файлы из папки паблик
app.use(express.static('public'))

// обработка подключения коиента
io.on('connection', (socket) => {
  console.log('пользователь подключился', socket.id)

  //Получить сообщение от клиента
  socket.on('chatMessage', (msg) => {
    console.log('Cooбщение от клиента', msg)
    // Сообщение подверждения клиенту
    socket.emit('messageFromServer', `Cooбщение получено:${msg}`)
  })
  // обработка отключения клиента
  socket.on('disconnect', () => {
    console.log('Пользователь отключился:', socket.id)
  })
})
server.listen(3000, () => {
  console.log('Cервер запущен')
})
