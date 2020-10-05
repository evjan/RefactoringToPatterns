class Loan {
  unusedRiskAmount(): number {
    return 10
  }

  getPayments(): LoanPayment[] {
    return [new LoanPayment()]
  }

  getStart(): any {
    return new Date("2020-09-01")
  }

  getToday(): Date {
    return new Date("2020-09-29")
  }

  getExpiry(): Date {
    return new Date("2021-09-01")
  }

  getRiskRating(): number {
    return 1
  }

  outstandingRiskAmount(): number {
    return 100  
  }

  public getCommitment(): number {
    return 10
  }

  public getUnusedPercentage(): number {
    return 10
  }
}

class LoanPayment {
  amount: number
  date: Date

  constructor() {
    this.amount = 10
    this.date = new Date("2020-09-15")
  }

}

export { Loan }