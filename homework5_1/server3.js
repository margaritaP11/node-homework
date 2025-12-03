const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === 'PUT') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('PUT- anfrage bearbeited')
  } else if (req.method === 'DELETE') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('DELETE- anfrage bearbeited')
  } else {
    res.statusCode = 405
    res.setHeader('Content-Type', 'text/plain')
    res.end('Methode wird nich gefördert')
  }
})

server.listen(3000, () => {
  console.log('Server running')
})
