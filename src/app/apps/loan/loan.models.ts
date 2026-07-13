export interface LoanSummaryMetric {
    metricType: 'rate' | 'amount',
    label: string,
    value: number,
    displayValue: string,
}