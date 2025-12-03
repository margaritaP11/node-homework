const fs = require('fs')
require('dotenv').config()

const filename = process.env.FILENAME

fs.writeFileSync(filename, 'Hi! Hier meine text durch Node.js')

const data = fs.readFileSync(filename, 'utf8')
console.log('Greetings', data)
