require_relative 'capital_strategy'

# Useful comment
class CapitalStrategyTermLoan < CapitalStrategy

  def capital(loan)
    loan.commitment * duration(loan) * risk_factor_for(loan)
  end

  def duration(loan)
    12
  end

end