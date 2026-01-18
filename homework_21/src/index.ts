// Задание 1

//Абстрактный класс Animal
//Создайте абстрактный класс `Animal` с абстрактным методом `makeSound()`.

//Затем создайте классы `Dog` и `Cat`, которые наследуют `Animal` и реализуют метод `makeSound()` по-своему (`Dog` должен возвращать "Bark", а `Cat` — "Meow").
//Создайте массив типа `Animal[]`, включающий объекты `Dog` и `Cat`, и вызовите метод `makeSound()` для каждого элемента массива.
abstract class Animal {
  abstract makeSound(): string
}
class Dog extends Animal {
  makeSound(): string {
    return 'Bark'
  }
}
class Cat extends Animal {
  makeSound(): string {
    return 'Meow'
  }
}
const animals: Animal[] = [new Dog(), new Cat()]
animals.forEach((a) => console.log(a.makeSound()))
//Задание 2
//Абстрактный класс Shape с цветом
//Создайте абстрактный класс `ColoredShape`, который наследует `Shape` (из задания 4 на уроке) и добавляет абстрактное поле `color`.
//Реализуйте классы `ColoredCircle` и `ColoredRectangle`, которые наследуют `ColoredShape`, задают `color` и реализуют метод `calculateArea()`.
//Выведите площадь и цвет для каждого объекта.
abstract class Shape {
  abstract calculateArea(): number
}
abstract class ColoredShape extends Shape {
  abstract color: string
}
class ColoredCircle extends ColoredShape {
  radius: number
  color: string
  constructor(radius: number, color: string) {
    super()
    this.radius = radius
    this.color = color
  }
  calculateArea(): number {
    return Math.PI * this.radius * this.radius
  }
}
class ColoredRectanlage extends ColoredShape {
  width: number
  height: number
  color: string

  constructor(width: number, height: number, color: string) {
    super()
    this.width = width
    this.height = height
    this.color = color
  }
  calculateArea(): number {
    return this.width * this.height
  }
}
const shapes: ColoredShape[] = [
  new ColoredCircle(5, 'blau'),
  new ColoredRectanlage(5, 8, 'red'),
]
shapes.forEach((shape) => {
  console.log(`Area: ${shape.calculateArea()}, Color: ${shape.color} `)
})

//Задание 3
//Абстрактный класс Appliance
//Создайте абстрактный класс `Appliance` с абстрактными методами `turnOn()` и `turnOff()`.
//Затем создайте классы `WashingMachine` и `Refrigerator`, которые наследуют `Appliance` и реализуют методы `turnOn()` и `turnOff()`, выводя соответствующие сообщения.
//Создайте массив типа `Appliance[]`, добавьте в него объекты `WashingMachine` и `Refrigerator`, и вызовите методы `turnOn()` и `turnOff()` для каждого элемента.
abstract class Appliance {
  abstract turnOn(): void
  abstract turnOff(): void
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log(' Washing machine is now On')
  }
  turnOff(): void {
    console.log(' Washing machine is now Off')
  }
}
class Refrigerator extends Appliance {
  turnOn(): void {
    console.log(' Refrigerator is now On')
  }
  turnOff(): void {
    console.log(' Refrigerator is now Off')
  }
}
const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()]
appliances.forEach((a) => {
  a.turnOn()
  a.turnOff()
})

//Задание 4
//Абстрактный класс Account
//Создайте абстрактный класс `Account` с абстрактными методами `deposit(amount: number)` и `withdraw(amount: number)`.
//Реализуйте классы `SavingsAccount` и `CheckingAccount`, которые наследуют `Account`.
//В классе `SavingsAccount` добавьте логику для начисления процентов на остаток.//
//В классе `CheckingAccount` реализуйте снятие средств с учетом комиссии.
//Проверьте работу методов на объектах обоих классов.

abstract class Account {
  balance: number
  constructor(balance: number) {
    this.balance = balance
  }
  abstract deposit(amount: number): void
  abstract withdraw(amount: number): void
}
class SavingsAccount extends Account {
  interestRate: number
  constructor(balance: number, interestRate: number) {
    super(balance)
    this.interestRate = interestRate
  }
  deposit(amount: number): void {
    this.balance += amount
  }
  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount
    } else {
      console.log('Not enough funds')
    }
  }
  addInterest(): void {
    this.balance += this.balance * this.interestRate
  }
}

class CheckingAccount extends Account {
  fee: number
  constructor(balance: number, fee: number) {
    super(balance)
    this.fee = fee
  }
  deposit(amount: number): void {
    this.balance += amount
  }
  withdraw(amount: number): void {
    const total = amount + this.fee
    if (total <= this.balance) {
      this.balance -= total
    } else {
      console.log('Not enough funds (including fee)')
    }
  }
}
const saving = new SavingsAccount(2000, 0.09)
saving.deposit(400)
saving.addInterest()
saving.withdraw(450)
console.log('Savings balance', saving.balance)

const checking = new CheckingAccount(300, 7)
checking.deposit(100)
checking.withdraw(300)
console.log('Checking balance', checking.balance)

//Задание 5

//Абстрактный класс Media
//Создайте абстрактный класс `Media` с абстрактным методом `play()`.
//Затем создайте классы `Audio` и `Video`, которые наследуют `Media` и реализуют метод `play()` по-своему (например, `Audio` выводит "Playing audio", а `Video` — "Playing video").
//Создайте массив типа `Media[]`, включающий объекты `Audio` и `Video`, и вызовите метод `play()` для каждого элемента массива.

abstract class Media {
  abstract play(): void
}
class Audio extends Media {
  play(): void {
    console.log('Playing audio')
  }
}

class Video extends Media {
  play(): void {
    console.log('Playing video')
  }
}

const mediaList: Media[] = [new Audio(), new Video()]
mediaList.forEach((m) => m.play())
