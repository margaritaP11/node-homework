const fs = require('fs')
const path = require('path')

function logMessage(message) {
  fs.appendFile('log.txt', message + '\n', (err) => {
    if (err) {
      console.log('Ошибка записи:', err)
    }
  })
}
module.exports = { logMessage }
