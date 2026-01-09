/* Задание 1
Функция приветствия
Напишите функцию `greetUser`, которая 
принимает имя пользователя (строка) и 
выводит приветственное сообщение в консоль: 
`"Привет, <name>!"`. Используйте строгую 
типизацию. */

function greetUser(name: string): void {
  console.log(`Меня зовут ${name}`)
}
greetUser('Маргарита')

/* Задание 2
Типизация функции с объектом в качестве параметра

1 Создайте интерфейс `Person`, который 
описывает человека с полями `name`, `age`,
 и `city`.

2Напишите функцию `printPersonInfo`,
 которая принимает объект типа `Person` и 
 выводит информацию о человеке в формате: 
 `"Имя: <name>, Возраст: <age>, Город: <city>"`.

 */

interface Person {
  name: string
  age: number
  city: string
}
function printPersonInfo(person: Person): void {
  console.log(
    `Имя: ${person.name}, Возраст:${person.age}, Город:${person.city}`
  )
}

const person1: Person = {
  name: 'Hanna',
  age: 28,
  city: 'Tokio',
}
printPersonInfo(person1)

/* Задание 3

Простая типизация для числового параметра
Напишите функцию `squareNumber`, которая
 принимает число и возвращает его квадрат.
  Используйте строгую типизацию. */

function squareNumber(num: number): number {
  return num * num
}
const resultSquare = squareNumber(5)
console.log(resultSquare)

/* Задание 4
Типизация функции с boolean
Напишите функцию `isEven`, которая 
принимает число и возвращает `true`, 
если число четное, и `false`, если нечетное.
 Используйте строгую типизацию. */

function isEven(num: number): boolean {
  return num % 2 === 0
}
console.log(isEven(4))
console.log(isEven(7))

/* Задание 5

Создание интерфейса для объекта
Создайте интерфейс `Student`, 
который описывает студента с полями `name`
 (строка) и `grade` (число).
Напишите функию `printStudentInfo`,
 которая принимает объект типа `Student`
  и выводит информацию о студенте в формате: 
  `"Студент: <name>, Оценка: <grade>"`. */

interface Student {
  name: string
  grade: number
}
function printStudentInfo(student: Student): void {
  console.log(`Студент:${student.name}, Оценка:${student.grade}`)
}
const student1: Student = {
  name: 'Joash',
  grade: 1.2,
}

printStudentInfo(student1)

/* Задание 6
Функция с типом `void`
Напишите функцию `logMessage`, 
которая принимает строку и выводит её в 
консоль без возвращаемого значения.
 Используйте тип `void`. */

function logMessage(message: string): void {
  console.log(message)
}
logMessage('Тест')
