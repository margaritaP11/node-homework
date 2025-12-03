const moment = require('moment')

const time = moment()

const timeFormat1 = time.format('DD-MM-YYYY')
const timeFormat2 = time.format('MMM Do YY')
const timeFormat3 = time.format('dddd')

console.log('DD-MM-YYYY:', timeFormat1)
console.log('MMM Do YY:', timeFormat1)
console.log('dddd:', timeFormat1)
