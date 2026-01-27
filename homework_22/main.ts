import { capitalize, reverseString } from './stringUtils'
import { Finance } from './finance'
import { UserManagement } from './userManagement'
import { generateFibonacci, generatePrimeNumbers } from './sequenceUtils'

// Задание 1
console.log(capitalize('hello'))
console.log(reverseString('world'))

// Задание 2
const loan = Finance.LoanCalculator.calculateMonthlyPayment(10000, 5, 12)
console.log('Monthly payment:', loan.toFixed(2))

const tax = Finance.TaxCalculator.calculateTax(50000, 20)
console.log('Tax:', tax)

// Задание 3
const admin = new UserManagement.Admin.AdminUser(
  'Маргарита',
  'admin@example.com',
)
console.log(admin)
admin.setSuperAdmin(true)
console.log('Updated admin:', admin)

// Задание 4
console.log('Fibonacci:', generateFibonacci(100))
console.log('Primes:', generatePrimeNumbers(30))
