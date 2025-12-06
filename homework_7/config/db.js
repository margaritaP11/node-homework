const { Sequelize } = require('sequelize')
const config = require('./config.json')

const env = 'development'
const { database, username, password, host, dialect } = config[env]

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
})
module.exports = sequelize
