# A abstract Useful comment
class CapitalStrategy

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