require_relative 'capital_strategy'

# Useful comment
class CapitalStrategyTermLoan < CapitalStrategy

  def capital(loan)
    loan.commitment * duration(loan) * risk_factor_for(loan)
  end

  def duration(loan)
    weighted_average_duration(loan)
  end

  def weighted_average_duration(_)
    12
  end

end