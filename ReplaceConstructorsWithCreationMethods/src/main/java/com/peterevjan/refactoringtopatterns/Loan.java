package com.peterevjan.refactoringtopatterns;

import java.util.Date;

public class Loan {
    public final double commitment;
    public final double outstanding;
    public final int riskRating;
    public final Date maturity;
    public final Date expiry;
    public CapitalStrategy capitalStrategy;

    private Loan(CapitalStrategy capitalStrategy, double commitment, double outstanding, int riskRating, Date maturity, Date expiry) {
        this.commitment = commitment;
        this.outstanding = outstanding;
        this.riskRating = riskRating;
        this.maturity = maturity;
        this.expiry = expiry;
        this.capitalStrategy = capitalStrategy;

        if (capitalStrategy == null) {
            if(expiry == null)
                this.capitalStrategy = new CapitalStrategyTermLoan();
            else if (maturity == null)
                this.capitalStrategy = new CapitalStrategyRevolver();
            else
                this.capitalStrategy = new CapitalStrategyRCTL();
        }
    }

    static Loan createTermLoan(double commitment, int riskRating, Date maturity) {
        return new Loan(new CapitalStrategyTermLoan(), commitment, 0.00, riskRating, maturity, null);
    }

    static Loan createTermLoanWithAdjustedCapitalStrategy(double commitment, int riskRating, Date maturity, CapitalStrategy riskAdjustedCapitalStrategy, double outstanding) {
        return new Loan(riskAdjustedCapitalStrategy, commitment, outstanding, riskRating, maturity, null);
    }

    static Loan createRevolverLoan(double commitment, int riskRating, Date maturity, double outstanding, Date expiry) {
        return new Loan(null, commitment, outstanding, riskRating, maturity, expiry);
    }

    static Loan createRevolverWithCapitalStrategy(double commitment, int riskRating, Date maturity, double outstanding, Date expiry, CapitalStrategy capitalStrategy) {
        return new Loan(capitalStrategy, commitment, outstanding, riskRating, maturity, expiry);
    }

    static Loan createRCTLLoan(double commitment, int riskRating, Date maturity, double outstanding, Date expiry) {
        return new Loan(null, commitment, outstanding, riskRating, maturity, expiry);
    }

    static Loan createRCTLLoanWithCapitalStrategy(double commitment, int riskRating, Date maturity, Date expiry, CapitalStrategy capitalStrategy) {
        return new Loan(capitalStrategy, commitment, 0.00, riskRating, maturity, expiry);
    }

    static Loan createRCTLLoanWithExpiry(double commitment, int riskRating, Date maturity, Date expiry) {
        return new Loan(null, commitment, 0.00, riskRating, maturity, expiry);
    }
}