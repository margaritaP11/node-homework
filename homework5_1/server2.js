const http = require('http')
const fs = require('fs')
const { error } = require('console')

const server = http.createServer((req, res) => {
  try {
    throw new Error('Test error ')

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Server is working')
  } catch (err) {
    fs.appendFile(
      'errors.log',
      `${new Date().toISOString()}-${err.message}\n`,
      (error) => {
        if (error) {
          console.error('Ошибка при записи в лог:', error)
        }
      }
    )
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('Server Error')
  }
})
server.listen(3000, () => {
  console.log('Server running')
})
