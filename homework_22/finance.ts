export namespace Finance {
  export class LoanCalculator {
    static calculateMonthlyPayment(
      principal: number,
      annualRate: number,
      months: number,
    ): number {
      const monthlyRate = annualRate / 12 / 100
      return (
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      )
    }
  }

  export class TaxCalculator {
    static calculateTax(income: number, rate: number): number {
      return (income * rate) / 100
    }
  }
}
