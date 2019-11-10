require_relative 'capital_strategy'

# Useful comment
class CapitalStrategyRevolver < CapitalStrategy

  def capital(loan)
    loan.outstanding_risk_amount * duration(loan) * risk_factor_for(loan) +
      (loan.unused_risk_amount * duration(loan) * unused_risk__factor(loan))
  end

  def unused_risk__factor(_loan)
    1
  end

end