# A abstract Useful comment
class CapitalStrategy

  # In general, it is Risk Amount x Duration x Risk Factor
  def capital(loan)
    raise 'this method should be overridden'
  end

  def duration(loan)
    24
  end

  def risk_factor_for(loan)
    1
  end


end