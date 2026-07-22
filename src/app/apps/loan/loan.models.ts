export interface LoanSummaryMetric {
    metricType: 'rate' | 'amount' | 'value';
    label: string;
    value: number;
    displayValue: string;
}

export interface LoanAmortizationValue {
    value: number;
    displayValue: string;
}

export interface LoanAmortizationSchedule {
    // Specific payment interval index
    period: number;
    // Time (in years)
    time: number;
    // Loan Payment
    loanPayment: LoanAmortizationValue;
    // Interest Paid at Time t
    interestPaid: LoanAmortizationValue;
    // Principal Repaid at Time t
    principalRepaid: LoanAmortizationValue;
    // Outstanding Balance at Time t
    outstandingBalance: LoanAmortizationValue;
}

export interface LoanTableConfiguration {
    name: string;
    heading: string;
    textPosition: string;
}