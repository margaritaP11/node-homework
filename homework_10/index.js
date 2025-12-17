const express = require('express') // фреймворк для создания сервера
const bcrypt = require('bcrypt') // библиотека для хеширования паролей
const jwt = require('jsonwebtoken') // библиотека для создания и проверки JWT токенов

const app = express()
app.use(express.json()) // позволяю серверу принимать JSON в теле запроса

// Фейковая база
let users = [] // массив пустой потому что он наполняеться динамически после регистрации
const getNextId = () =>
  users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1

const JWT_SECRET = 'super_secret_key' // секретный ключ для токенов

// -------------
// Middelware для проверки JWT

const authenticatedJWT = (req, res, next) => {
  // Токен должен приходить в заголовке Authorization
  // и если заголовка нет то пользователь не авторизован
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(404).json({ message: 'Токен не передан' })
  }

  // Токен приходит в формате Bearer token

  /* Bearer token — это спеціальний тип токена (строки символів), який використовується для авторизації в веб‑додатках та API. Назва Bearer означає: "той, хто пред’являє цей токен, має доступ". Тобто сам факт наявності токена дає право виконувати запит. */

  const token = authHeader.split(' ')[1]
  // Проверка токена JWT (JSON Web Token) Токен складається з трьох частин: header.payload.signature. Payload містить інформацію про користувача (наприклад, id, email, role).
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Неверный или просроченый токен' })
    }
    // Cохраняем данные пользователя из токена в req.user
    req.user = payload
    next() /* В Express.js next — это функция обратного вызова, которая передаётся каждому middleware. 
    Она нужна, чтобы сказать фреймворку: ➡️ "Я закончил работу в этом middleware, можно переходить к следующему".
    Если next() не вызвать, запрос "зависнет": сервер не отправит ответ, потому что цепочка обработки не завершена. */
  })
}

//-----------
// Регистрация поьзователя

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body
    // Проверяем есть ли такой уже такой email
    const existing = users.find((u) => u.email === email)
    if (existing)
      return res.status(400).json({ message: 'Email уже используется' })

    // Хешируем пароль
    const hashed = await bcrypt.hash(password, 10)

    // Создаем нового пользователя
    const newUser = {
      id: getNextId(),
      username,
      email,
      password: hashed,
      role: role || 'user', // по умолчанию роль юзер
    }
    // Добавление в массив
    users.push(newUser)
    res
      .status(201)
      .json({ message: 'Пользователь усппешно зарегистрирован', user: newUser })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// --------
// Логин (получение JWT)

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    // Ищем пользователя по email
    const user = users.find((u) => u.email === email)
    if (!user)
      return res.status(400).json({ message: 'Неверный email или пароль' })
    // Проверяем пароль
    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res.status(400).json({ message: 'Неверный email или пароль' })

    // Создаем токен
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    )
    res.json({ token })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

//----------
// Задание 1 -- обновление email

app.put('/update-email', authenticatedJWT, (req, res) => {
  try {
    const { newEmail } = req.body
    const userId = req.user.id
    // Ищем пользователя
    const user = users.find((u) => u.id === userId)
    if (!user)
      return res.status(404).json({ message: 'Пользователь не найдет' })
    // Проверяем что emeil не занят
    const emailTaken = users.find((u) => u.email === newEmail)
    if (emailTaken)
      return res.status(400).json({ message: 'Этот емейл уже используеться' })
    // Обновляем емейл
    user.email = newEmail
    res.json({ message: 'Емейл обновлен', user })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})
// --------------
// 2 удаление аккаунта
app.delete('/delete-account', authenticatedJWT, (req, res) => {
  try {
    const userId = req.user.id
    //Проверяем существует ли пользователь
    const exists = users.some((u) => u.id === userId)

    if (!exists)
      return res.status(404).json({ message: 'Пользователь не найден' })
    // Удаляем пользователя
    users = users.filter((u) => u.id !== userId)
    res.json({ message: 'Аккаунт успешно удален' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})
// ---------
// Миделвар для проверки

const authorizeRolle = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Доступ запрещен' })
  }
  next()
}

// ------------
// 3 Обновление роли.

app.put(
  '/update-role',
  authenticatedJWT,
  authorizeRolle('admin'),
  (req, res) => {
    try {
      const { userId, newRole } = req.body

      // Ищем пользователя
      const user = users.find((u) => u.id === userId)
      if (!user)
        return res.status(404).json({ message: 'Пользователь не найден' })
      // Обновляем роль
      user.role = newRole
      res.json({ message: 'Роль обновлена', user })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
)
// обновление jwt token

app.post('/refresh-token', authenticatedJWT, (req, res) => {
  try {
    const user = req.user
    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    )
    res.json({ token: newToken })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

app.listen(3000, () => {
  console.log('Сервер запущен')
})
