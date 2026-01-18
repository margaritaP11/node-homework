/* Задание 1
Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив чисел и возвращает сумму всех четных чисел.
 */
const sumEvenNumbers = (numbers: number[]): number => {
  return numbers.filter((n) => n % 2 === 0).reduce((sum, n) => sum + n, 0)
}
console.log(sumEvenNumbers([3, 6, 7, 8]))

/* 
Задание 2
Определите интерфейс `StringToBooleanFunction` для функции, которая принимает строку и возвращает `boolean` (например, проверяет, является ли строка пустой). Реализуйте такую функцию.
 */
interface StringToBooleanFunction {
  (str: string): boolean
}
const isEmpty: StringToBooleanFunction = (str) => str.trim().length === 0

console.log(isEmpty(''))
console.log(isEmpty('sdfg'))

/* Задание 3
Создайте тип `CompareStrings` для функции, принимающей две строки и возвращающей `boolean` (например, для проверки равенства строк). Напишите функцию, соответствующую этому типу.
 */
type CompareStrings = (a: string, b: string) => boolean
const equal: CompareStrings = (a, b) => a === b
console.log(equal('qwer', 'qwer'))
console.log(equal('qwert', 'tzui'))
/* Задание 4


Напишите обобщенную функцию `getLastElement`, которая принимает массив любого типа и возвращает последний элемент этого массива.
 */
const getLastElement = <T>(arr: T[]): T => {
  if (arr.length === 0) {
    throw new Error('Нельзя что бы масив был пуст')
  }
  return arr[arr.length - 1]!
}
console.log(getLastElement([1, 3, 5]))

/* Задание 5


Создайте обобщенную функцию `make Triple`, которая принимает три аргумента одного типа и возвращает массив из этих трёх элементов. */
const makeTriple = <T>(a: T, b: T, c: T): T[] => {
  return [a, b, c]
}
console.log(makeTriple(1, 5, 7))
console.log(makeTriple('apple', 'orang', 'banane'))
console.log(makeTriple({ t: 1 }, { t: 2 }, { t: 3 }))
