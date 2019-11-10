require_relative 'capital_strategy'

# Useful comment
class CapitalStrategyAdvisedLine < CapitalStrategy

  def capital(loan)
    loan.commitment * loan.unused_percentage * duration(loan) * risk_factor_for(loan)
  end

end