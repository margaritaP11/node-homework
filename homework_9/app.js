const express = require('express')
const bcrypt = require('bcrypt')
const db = require('./models')

const app = express()
app.use(express.json())

const { User } = db
db.sequelize
  .authenticate()
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ Database connection error:', err))

//Задача 1 Для регистрации

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser)
      return res.status(400).json({ message: 'Этот Email уже зарегистрирован' })
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ email, password: hashedPassword })
    res.status(201).json({ id: newUser.id, email: newUser.email })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Задача 2 Для смены пароля
app.post('/change-password', async (req, res) => {
  const { userId, newPassword } = req.body
  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' })
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  await user.update({ password: hashedPassword, mustChangePassword: false })
  res.json({ message: 'Пароль изминен' })
})

// Задача 3 для удаления аккаунта
app.post('/delete-account', async (req, res) => {
  const { userId, password } = req.body
  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ message: 'Пользователь не найдет' })
  const match = await bcrypt.compare(password, user.password)

  if (!match) return res.status(400).json({ message: 'Неверный пароль' })
  await user.destroy()
  res.json({ message: 'Аккаунт удален' })
})

//Задача 4 для доступа админа

app.get('/admin', async (req, res) => {
  const { userId } = req.query
  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ message: 'Пользователь не найдет' })
  if (user.role !== 'admin')
    return res.status(403).json({ message: 'Доступ запрещен' })
  res.json({ message: `Добро пожаловать, админ ${user.email}` })
})

// Задача 5 для смены email

app.post('/change-email', async (req, res) => {
  const { userId, newEmail, password } = req.body
  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ message: 'Пользователь не найдет' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: 'Неверный пароль' })

  const existingUser = await User.findOne({ where: { email: newEmail } })
  if (existingUser)
    return res.status(400).json({ message: 'Email уже используеться' })

  await user.update({ email: newEmail })
  res.json({ message: 'Email изменен', email: newEmail })
})

app.listen(3000, () => console.log('Server started on port 3000'))
