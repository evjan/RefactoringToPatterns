import { Loan } from './Loans'
import { RiskFactors } from './RiskFactors'

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

export { CapitalStrategyAdvisedLine, CapitalStrategyRevolver, CapitalStrategyTermLoan }