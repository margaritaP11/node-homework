/* Задание 1
Обработка цепочки промисов с `async/await`
Создайте несколько функций, которые возвращают 
промисы с разным временем выполнения.
Напишите функцию, которая вызывает эти промисы поочерёдно, 
используя `await`, и обрабатывает результаты каждой операции.
Убедитесь, что цепочка промисов выполняется последовательно. */

function delay(ms: number, value: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })
}

async function runSequential() {
  console.log('Задание 1: последовательные промисы')
  const r1 = await delay(1000, 'Первый промис')
  console.log(r1)
  const r2 = await delay(500, 'Второй промис')
  console.log(r2)
  const r3 = await delay(1500, 'Третий промис')
  console.log(r3)
  console.log('Все промисы выполнены последовательно\n')
}

/* Задание 2

Асинхронная обработка данных из массива
Напишите функцию, которая принимает массив строк.
Каждая строка будет асинхронно обрабатываться (например, 
преобразовываться в верхний регистр с задержкой).
Используйте `Promise.all` для выполнения всех операций
 параллельно и вывода всех результатов. */
function processString(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(str.toUpperCase()), 500)
  })
}
async function runParallelStrings() {
  console.log('Задание 2: параллельная обработка строк')
  const arr = ['hello', 'world', 'margarita']
  const promises = arr.map((s) => processString(s))
  const results = await Promise.all(promises)
  console.log('Результат:', results, '\n')
}

/* Задание 3
Обработка ошибки в параллельных промисах
Напишите функцию, которая вызывает три промиса параллельно с помощью `Promise.all`.
Один из промисов должен намеренно завершиться с ошибкой через `reject`. 
Обработайте эту ошибку с использованием `try/catch` 
и выведите соответствующее сообщение.
 */

function okPromise(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve('Ok'), 500))
}

function badPromise(): Promise<string> {
  return new Promise((_, reject) =>
    setTimeout(() => reject('Ошибка в промисе!'), 700),
  )
}

async function runWithError() {
  console.log('обработка ошибки в Promise.all')

  try {
    const result = await Promise.all([okPromise(), badPromise(), okPromise()])
    console.log(result)
  } catch (error) {
    console.log('Поймали ошибку:', error, '\n')
  }
}

/* Задание 4
Асинхронная функция с динамическим временем выполнения
Напишите асинхронную функцию, которая принимает массив чисел.
Для каждого числа создайте промис, который будет завершаться через 
количество миллисекунд, равное значению числа.
Используйте `Promise.all` для ожидания завершения всех 
промисов и вывода результатов в консоль. */

function dynamicDelay(ms: number): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Готово через ${ms} мс`), ms),
  )
}
async function runDynamic() {
  console.log('Задание 4: динамические задержки')
  const numbers = [300, 1000, 500]
  const promises = numbers.map((n) => dynamicDelay(n))
  const results = await Promise.all(promises)
  console.log('Результаты:', results, '\n')
}

// запуск

async function main() {
  await runSequential()
  await runParallelStrings()
  await runWithError()
  await runDynamic()
}
main()
