let { CapitalStrategyAdvisedLine, CapitalStrategyRevolver, CapitalStrategyTermLoan } = require('../CapitalStrategies')
let { Loan } = require('../Loans')

describe('Capital Strategy Advised Line', () => {  
  it('calculates the capital', () => {
    const loan = new Loan()
    const strategy = new CapitalStrategyAdvisedLine()
    const capital = strategy.capital(loan)
    expect(capital).toEqual(1846.5753424657535)
  })
})

describe('Capital Strategy Revolver', () => {  
  it('calculates the capital', () => {
    const loan = new Loan()
    const strategy = new CapitalStrategyRevolver()
    const capital = strategy.capital(loan)
    expect(capital).toEqual(1938.9041095890411)
  })
})

describe('Capital Strategy Term Loan', () => {  
  it('calculates the capital', () => {
    const loan = new Loan()
    const strategy = new CapitalStrategyTermLoan()
    const capital = strategy.capital(loan)
    expect(capital).toEqual(-7.671232876712328)
  })
})  