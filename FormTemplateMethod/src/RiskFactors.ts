class RiskFactors {
  forRating(riskRating: any): number {
    return 2
  }
  static getFactors() {
    return new RiskFactors()
  }
}

export { RiskFactors }