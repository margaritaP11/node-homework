export function generateFibonacci(limit: number): number[] {
  const result = [0, 1]

  while (result[result.length - 1] + result[result.length - 2] <= limit) {
    result.push(result[result.length - 1]) + result[result.length - 2]
  }
  return result
}

export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = []
  for (let i = 2; i <= limit; i++) {
    if (primes.every((p) => i % p !== 0)) {
      primes.push(i)
    }
  }
  return primes
}
