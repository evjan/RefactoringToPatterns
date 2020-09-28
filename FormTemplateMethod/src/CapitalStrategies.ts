abstract class CapitalStrategy {
  readonly MILLIS_PER_DAY: number = 8640000
  readonly DAYS_PER_YEAR: number = 365

  public abstract capital(loan: Loan): number

  riskFactorFor(loan: Loan): number {
    return RiskFactors.getFactors().forRating(loan.getRiskRating())
  }

  duration(loan: Loan): number {
    return this.yearsTo(loan.getExpiry(), loan)
  }

  yearsTo(endDate: Date, loan: Loan): number {
    const beginDate: Date = (loan.getToday() == null ? loan.getStart() : loan.getToday())
    return ((endDate.getTime() - beginDate.getTime()) / this.MILLIS_PER_DAY / this.DAYS_PER_YEAR)
  }
}

class RiskFactors {
  forRating(riskRating: any): number {
    return 2
  }
  static getFactors() {
    return new RiskFactors()
  }
}

class CapitalStrategyAdvisedLine extends CapitalStrategy {
  public capital(loan: Loan): number {
    return loan.getCommitment() * 
              loan.getUnusedPercentage() * 
              this.duration(loan) *
              this.riskFactorFor(loan)
  }
}

class CapitalStrategyTermLoan extends CapitalStrategy {  
  public capital(loan: Loan): number {
    return loan.getCommitment() * this.duration(loan) * this.riskFactorFor(loan)
  }

  duration(loan: Loan): number {
    return this.weightedAverageDuration(loan)
  }

  weightedAverageDuration(loan: Loan): number {
    let duration = 1.0
    let weightedAverage = 0.0
    let sumOfPayments = 0.0

    for(const payment of loan.getPayments()) {
      sumOfPayments += payment.amount
      weightedAverage += this.yearsTo(payment.date, loan) * payment.amount
    }

    if(loan.getCommitment() !== 0.0) {
      duration = weightedAverage / sumOfPayments
    }

    return duration
  }

  riskFactorFor(loan: Loan) {
    return 2
  }
}

class CapitalStrategyRevolver extends CapitalStrategy {  
  public capital(loan: Loan): number {
    return (loan.outstandingRiskAmount() * this.duration(loan) * this.riskFactorFor(loan))
    + (loan.unusedRiskAmount() * this.duration(loan) * this.unusedRiskFactor(loan))
  }
  
  unusedRiskFactor(loan: Loan): number {
    return 1
  }
}

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

export { CapitalStrategyAdvisedLine, CapitalStrategyRevolver, CapitalStrategyTermLoan, Loan }