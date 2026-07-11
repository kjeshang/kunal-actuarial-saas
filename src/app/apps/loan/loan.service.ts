import { Injectable } from "@angular/core";
import currency from 'currency.js';
import { LoanSummaryMetric } from "./loan.models";

@Injectable({
  providedIn: 'root',
})
export class LoanService {

  calculatePeriodicPaymentAmount(termOfLoan: number, paymentFrequency: number) {
    // 1. Find the total number of payments
    const N: number = termOfLoan * paymentFrequency;

  }

  calculatePeriodicEffectiveInterestRate(interestRate: number, paymentFrequency: number): LoanSummaryMetric {
    const rawJ: number = Math.pow(1 + interestRate, 1 / paymentFrequency) - 1;
    // Rounding percentage to 4 decimal places
    const j: number = Math.round((rawJ * 100 + Number.EPSILON) * 10000) / 10000 / 100;
    const metric: LoanSummaryMetric = {
      label: this.determinePaymentFrequencyLabel(paymentFrequency),
      value: j,
      displayValue: (j * 100).toFixed(4)
    }
    return metric;
  }

  private determinePaymentFrequencyLabel(paymentFrequency: number): string {
    let label: string = "";
    switch (paymentFrequency.toString()) {
      case "1":
        label = "Annual";
        break;
      case "2":
        label = "Semiannual";
        break;
      case "4":
        label = "Quarterly";
        break;
      case "12":
        label = "Monthly";
        break;
      default:
        label = "";
    }
    return label;
  }
}