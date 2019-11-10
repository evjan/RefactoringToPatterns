require_relative 'capital_strategy_term_loan'
require_relative 'capital_strategy_advised_line'
require_relative 'capital_strategy_revolver'

# Useful comment
class Loan

  attr_reader :expiry, :maturity, :commitment, :outstanding, :start, :risk_rating
  attr_accessor :unused_percentage

  def initialize(commitment, outstanding, start, expiry, maturity, risk_rating, capital_strategy)
    @start = start
    @expiry = expiry
    @maturity = maturity
    @commitment = commitment
    @outstanding = outstanding
    @risk_rating = risk_rating
    @capital_strategy = capital_strategy
  end

  def self.new_revolver(commitment, start, expiry, risk_rating)
    new(commitment, 0, start, expiry, nil, risk_rating, CapitalStrategyRevolver.new)
  end


  def self.new_term_loan(commitment, start, maturity, risk_rating)
    new(commitment, commitment, start, nil, maturity, risk_rating, CapitalStrategyTermLoan.new)
  end

  def self.new_advised_line(commitment, start, expiry, risk_rating)
    return nil if risk_rating > 3

    advised_line = new(commitment, 0, start, expiry, nil, risk_rating, CapitalStrategyAdvisedLine.new)
    advised_line.unused_percentage = 0.1
    advised_line
  end

  def capital
    @capital_strategy.capital(self)
  end

  def duration
    @capital_strategy.duration(self)
  end

  def outstanding_risk_amount
    7
  end

  def unused_risk_amount
    commitment - outstanding_risk_amount
  end

end