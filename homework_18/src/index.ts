/* 
Задание 1
Объединение и пересечение типов
Создайте два типа: `Admin` и `User`.
Тип `Admin` должен включать поля `name` (строка) и 
`permissions` (массив строк), а тип `User` должен 
включать поля `name` (строка) и `email` (строка).
Создайте тип `AdminUser`, который объединяет 
свойства обоих типов, и создайте объект этого типа.


Задание 2
Вложенные объекты и опциональные поля
Создайте объект `Car` с полями `make` (строка), 
`model` (строка), и вложенным объектом `engine`, 
который имеет поля `type` (строка) и `horsepower` (число).
Добавьте опциональное поле `year` (число) 
для года выпуска машины.
Напишите функцию, которая выводит информацию о машине.




Задание 3
Интерфейс для функции с объектом
Создайте интерфейс для функции 
`calculateDiscount`, которая принимает объект 
`Product` с полями `name` (строка) и `price` 
(число), а также параметр `discount` (число).
Функция должна возвращать новую цену продукта с учетом скидки.



Задание 4
Массив объектов и функции
Создайте интерфейс `Employee`, который 
включает поля `name` (строка) и `salary` (число).
Создайте массив объектов `Employee`, затем 
напишите функцию, которая принимает этот массив и 
возвращает массив зарплат всех сотрудников.



Задание 5
Наследование интерфейсов и работа с объектами
Создайте интерфейс `Person` с полями `firstName`
 (строка) и `lastName` (строка).
Создайте интерфейс `Student`, который наследует 
`Person` и добавляет поле `grade` (число).
Создайте объект `student` этого типа и напишите 
функцию, которая выводит полное имя студента и его оценку.




Задание 6
Интерфейс для функции с несколькими параметрами
Создайте интерфейс для функции `concatStrings`,
 которая принимает два параметра: `str1` и `str2` (оба строки) 
 и возвращает их объединение.
Реализуйте эту функцию и протестируйте её.
 */

//1

import { log } from 'node:console'

type Admin = {
  name: string
  permissions: string[]
}
type User = {
  name: string
  email: string
}
type AdminUser = Admin & User

const adminUser: AdminUser = {
  name: ' Margarita',
  permissions: ['read', 'write', 'delete'],
  email: 'margarita@gmail.com',
}
console.log(adminUser)

// 2

type Car = {
  make: string
  model: string
  engine: {
    type: string
    horsepower: number
  }
  year?: number
}
const myCar: Car = {
  make: 'Tesla',
  model: 'S Plaid',
  engine: {
    type: 'Long Range',
    horsepower: 200,
  },
  year: 2021,
}

function teslaCar(car: Car): void {
  console.log(
    `Марка ${car.make}, модель:${car.model}, двигатель:${car.engine.type}, ${car.engine.horsepower}, год выпуска:${car.year}`
  )
}
teslaCar(myCar)

//3
interface Product {
  name: string
  price: number
}

interface CalculateDiscount {
  (product: Product, discount: number): number
}

const calculateDiscount: CalculateDiscount = (product, discount) => {
  return product.price - product.price * (discount / 100)
}

const phone: Product = { name: 'iPhone11', price: 800 }
console.log(calculateDiscount(phone, 10))

//4
interface Employee {
  name: string
  salary: number
}
const employees: Employee[] = [
  { name: 'Kim', salary: 3000 },
  { name: 'Lim', salary: 3500 },
  { name: 'Son', salary: 2000 },
]
function getSalaries(list: Employee[]): number[] {
  return list.map((emp) => emp.salary)
}

console.log(getSalaries(employees))

//5

interface Person {
  firstName: string
  lastName: string
}
interface Student extends Person {
  grade: number
}

const student: Student = {
  firstName: 'Lim',
  lastName: 'Teg',
  grade: 95,
}
function studentsInfo(s: Student): void {
  console.log(`Student: ${s.firstName} ${s.lastName}, grade:${s.grade} `)
}
studentsInfo(student)

//6

interface ConcatStrings {
  (str1: string, str2: string): string
}
const concatString: ConcatStrings = (str1, str2) => {
  return str1 + str2
}
console.log(concatString('I', 'am'))
