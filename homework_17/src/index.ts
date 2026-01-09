/* Задание 1
Типизация функции с несколькими параметрами
Напишите функцию `calculateTotal`, которая 
принимает три параметра:  
`price` (число)  
`quantity` (число)  
`discount` (число, по умолчанию равен 0)
Функция должна возвращать общую стоимость товаров с учетом скидки. 
Если скидка не указана, она считается равной нулю. */

function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  const total = price * quantity

  const totalWithDiscount = total - discount
  return totalWithDiscount
}
console.log(calculateTotal(10, 2))
console.log(calculateTotal(10, 2, 90))

/* Задание 2
Использование Union типов

Создайте переменную `id`, которая 
может быть либо строкой, либо числом.  

Напишите функцию `displayId`, которая принимает 
эту переменную и выводит сообщение, содержащее 
значение ID. Если `id` — строка, выведите 
её в верхнем регистре. Если `id` — число, 
умножьте его на 10 перед выводом. */

let id: string | number

function displayId(id: string | number): void {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id * 10)
  }
}
displayId('abc')
displayId(5)

/* Задание 3

Объявление и типизация массивов объектов

Создайте массив объектов `orders`, 
где каждый объект описывает заказ и 
содержит следующие свойства:  
`orderId` (строка)  
`amount` (число)  
`status` (строка, может принимать значения 
"pending", "shipped" или "delivered")
Напишите функцию `filterOrdersByStatus`,
 которая принимает этот массив и строку 
 `status`, и возвращает массив заказов, 
 соответствующих указанному статусу.
 */

type OrderStatus = 'pending' | 'shipped' | 'delivered'

interface Order {
  orderId: string
  amount: number
  status: OrderStatus
}

const orders: Order[] = [
  { orderId: 'A1', amount: 100, status: 'pending' },
  { orderId: 'A2', amount: 200, status: 'shipped' },
  { orderId: 'A3', amount: 300, status: 'delivered' },
  { orderId: 'A4', amount: 400, status: 'pending' },
]

function filterOrdersByStatus(orders: Order[], status: OrderStatus): Order[] {
  return orders.filter((order) => order.status === status)
}

console.log(filterOrdersByStatus(orders, 'pending'))

/* Задание 4
Работа с кортежами и объектами
Создайте кортеж `productInfo`, который содержит:  
название товара (строка)  
его цену (число)  
количество на складе (число)

Напишите функцию `updateStock`,
 которая принимает объект `inventory` 
 (где ключ — это название товара, а значение — 
 количество на складе) и кортеж `productInfo`.
  Функция должна прибавить изменение количества из 
  кортежа к текущему значению в inventory 
  (если товара ещё нет, добавить его с этим
   количеством) и вернуть обновлённый объект. */

type ProductInfo = [string, number, number]
interface Inventory {
  [productName: string]: number
}
function updateStock(
  inventory: Inventory,
  productInfo: ProductInfo
): Inventory {
  const [name, price, quantityChange] = productInfo

  if (!inventory[name]) {
    inventory[name] = quantityChange
  } else {
    inventory[name] += quantityChange
  }
  return inventory
}
let inventory: Inventory = {
  Laptop: 10,
  Mouse: 25,
}
const productInfo: ProductInfo = ['Laptop', 1300, 3]

console.log(updateStock(inventory, productInfo))
