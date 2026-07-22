import { Injectable } from "@angular/core";
import currency from 'currency.js';
import { LoanAmortizationSchedule, LoanSummaryMetric } from "./loan.models";

@Injectable({
  providedIn: 'root',
})
export class LoanService {

  /**
   * Method used to take loan parameters and format them for display/reporting purposes.
   * @param loanAmount 
   * @param interestRate 
   * @param termOfLoan 
   * @param paymentFrequency 
   * @returns Array of loan summary metrics that reference the loan parameters.
   */
  formatLoanParameters(loanAmount: number, interestRate: number, termOfLoan: number, paymentFrequency: number): LoanSummaryMetric[] {
    // Loan Amount
    const formattedLoanAmount: LoanSummaryMetric = {
      metricType: "amount",
      label: "Loan Amount",
      value: loanAmount,
      displayValue: currency(loanAmount).format()
    };
    // 2. Interest Rate
    const formattedInterestRate: LoanSummaryMetric = {
      metricType: "rate",
      label: "Annual Effective Interest Rate",
      value: Math.round((interestRate * 100 + Number.EPSILON) * 10000) / 10000 / 100,
      displayValue: `${(interestRate * 100).toFixed(4)}%`,
    }
    // 3. Term of Loan
    const formattedTermOfLoan: LoanSummaryMetric = {
      metricType: "value",
      label: "Term of Loan (in years)",
      value: termOfLoan,
      displayValue: `${termOfLoan} years`
    };
    // 4. Payment Frequency
    const formattedPaymentFrequency: LoanSummaryMetric = {
      metricType: "value",
      label: "Payment Frequency (per year)",
      value: paymentFrequency,
      displayValue: this.determinePaymentFrequencyLabel(paymentFrequency)
    };
    // 5. Create array of formatted loan parameters.
    const loanParameters: LoanSummaryMetric[] = [
      formattedLoanAmount,
      formattedInterestRate,
      formattedTermOfLoan,
      formattedPaymentFrequency
    ];
    return loanParameters;
  }

  /**
   * Method used to calculate m-thly payment amount, and show its calculated value & formatted value for display purposes.
   * @param loanAmount 
   * @param interestRate 
   * @param termOfLoan 
   * @param paymentFrequency 
   * @returns Object containing metric type, label, value, and display value.
   */
  calculatePeriodicPaymentAmount(loanAmount: number, interestRate: number, termOfLoan: number, paymentFrequency: number): LoanSummaryMetric {
    // 1. Find the total number of payments
    const N: number = termOfLoan * paymentFrequency;
    // 2. Calculate m-thly effecive interest rate
    const j: number = this.calculatePeriodicEffectiveInterestRate(interestRate, paymentFrequency).value;
    // 3. Calculate m-thly payment amount
    const numerator: number = currency(loanAmount).multiply(j).value;
    // Alternate => const numerator: number = loanAmount * j;
    const denominator: number = 1 - Math.pow(1 + j, -N);
    const R: number = currency(numerator).divide(denominator).value;
    // Alternate => const R: number = numerator / denominator;
    const label: string = this.determinePaymentFrequencyLabel(paymentFrequency);
    const metric: LoanSummaryMetric = {
      metricType: "amount",
      label: `${this.determinePaymentFrequencyLabel(paymentFrequency)} Payment Amount`,
      value: R,
      displayValue: currency(R).format()
    };
    return metric;
  }

  /**
   * Method used to calculate the m-thly effective interest rate, and show its calculated value & formatted value for display purposes.
   * @param interestRate 
   * @param paymentFrequency 
   * @returns Object containing metric type, label, value, and display value.
   */
  calculatePeriodicEffectiveInterestRate(interestRate: number, paymentFrequency: number): LoanSummaryMetric {
    const rawJ: number = Math.pow(1 + interestRate, 1 / paymentFrequency) - 1;
    // Rounding percentage to 4 decimal places
    const j: number = Math.round((rawJ * 100 + Number.EPSILON) * 10000) / 10000 / 100;
    const metric: LoanSummaryMetric = {
      metricType: "rate",
      label: `${this.determinePaymentFrequencyLabel(paymentFrequency)} Effective Interest Rate`,
      value: j,
      displayValue: `${(j * 100).toFixed(4)}%`
    }
    return metric;
  }

  /**
   * Method used to calculate m-thly nominal interest rate, and show its calculated value & formatted value for display purposes.
   * @param interestRate
   * @param paymentFrequency
   * @returns Object containing metric type, label, value, and display value.
   */
  calculatePeriodicNominalInterestRate(interestRate: number, paymentFrequency: number): LoanSummaryMetric {
    // 1. Calculate m-thly effecive interest rate
    const rawJ: number = Math.pow(1 + interestRate, 1 / paymentFrequency) - 1;
    // 2. Calculate m-thly nominal interest rate
    const rawIM: number = paymentFrequency * rawJ;
    // Rounding percentage to 4 decimal places
    const iM: number = Math.round((rawIM * 100 + Number.EPSILON) * 10000) / 10000 / 100;
    const metric: LoanSummaryMetric = {
      metricType: "rate",
      label: `${this.determinePaymentFrequencyLabel(paymentFrequency)} Nominal Effective Interest Rate`,
      value: iM,
      displayValue: `${(iM * 100).toFixed(4)}%`
    };
    return metric;
  }

  /**
   * Method used to calculate m-thly effective rate of discount, and show its calculated value & formatted value for display purposes.
   * @param interestRate 
   * @param paymentFrequency 
   * @returns Object containing metric type, label, value, and display value.
   */
  calculatePeriodicEffectiveDiscountRate(interestRate: number, paymentFrequency: number): LoanSummaryMetric {
    const rawDPer: number = 1 - Math.pow(1 + interestRate, -(1 / paymentFrequency));
    const dPer: number = Math.round((rawDPer * 100 + Number.EPSILON) * 10000) / 10000 / 100;
    const metric: LoanSummaryMetric = {
      metricType: "rate",
      label: `${this.determinePaymentFrequencyLabel(paymentFrequency)} Effective Rate of Discount`,
      value: dPer,
      displayValue: `${(dPer * 100).toFixed(4)}%`
    };
    return metric;
  }

  /**
   * Calculate total number of payment periods required to pay-off the loan.
   * @param termOfLoan 
   * @param paymentFrequency 
   * @returns Object containing metric type, label, value, and display value.
   */
  calculateTotalNumberOfPeriods(termOfLoan: number, paymentFrequency: number): LoanSummaryMetric {
    const numberOfPeriods: number = termOfLoan * paymentFrequency;
    const metric: LoanSummaryMetric = {
      metricType: "value",
      label: "Total Number of Periods",
      value: numberOfPeriods,
      displayValue: numberOfPeriods.toString()
    };
    return metric;
  }

  /**
   * Method used to calculate total interest paid during loan amortization schedule, and show its calculated value & formatted value for display purposes. 
   * @param loanAmount 
   * @param interestRate 
   * @param termOfLoan 
   * @param paymentFrequency 
   * @returns Object containing metric type, label, value, and display value.
   */
  calculateTotalInterestPaid(loanAmount: number, interestRate: number, termOfLoan: number, paymentFrequency: number): LoanSummaryMetric {
    const loanAmortizationSchedule: LoanAmortizationSchedule[] = this.createLoanAmortizationSchedule(loanAmount, interestRate, termOfLoan, paymentFrequency);
    const totalInterestPaid: number = loanAmortizationSchedule.reduce((acc: number, val: LoanAmortizationSchedule) => {
      return currency(acc).add(val.interestPaid.value).value;
    }, 0);
    const metric: LoanSummaryMetric = {
      metricType: "amount",
      label: "Total Interest Paid",
      value: totalInterestPaid,
      displayValue: currency(totalInterestPaid).format()
    };
    return metric;
  }

  /**
   * Method used to generate loan amortization schedule based on loan amount, interest rate, term of loan, and payment frequency.
   * @param loanAmount 
   * @param interestRate 
   * @param termOfLoan 
   * @param paymentFrequency 
   * @returns Object array of containing period, time, loanPayment, interest paid, principal repaid, and outstanding balance
   */
  createLoanAmortizationSchedule(loanAmount: number, interestRate: number, termOfLoan: number, paymentFrequency: number): LoanAmortizationSchedule[] {
    const N: number = termOfLoan * paymentFrequency;
    const j: number = this.calculatePeriodicEffectiveInterestRate(interestRate, paymentFrequency).value;
    const R: number = this.calculatePeriodicPaymentAmount(loanAmount, interestRate, termOfLoan, paymentFrequency).value;
    let outstandingBalance: number = loanAmount;
    let loanAmortizationSchedule: LoanAmortizationSchedule[] = [];
    for (let t = 0; t <= N + 2; t++) {
      if (t == 0) {
        const result: LoanAmortizationSchedule = {
          period: 0,
          time: 0,
          loanPayment: { value: 0, displayValue: "-" },
          interestPaid: { value: 0, displayValue: "-" },
          principalRepaid: { value: 0, displayValue: "-" },
          outstandingBalance: { value: outstandingBalance, displayValue: currency(outstandingBalance).format() }
        }
        loanAmortizationSchedule.push(result);
      }
      else if (outstandingBalance === 0) {
        const result: LoanAmortizationSchedule = {
          period: t,
          time: parseFloat((t / paymentFrequency).toFixed(3)),
          loanPayment: { value: 0, displayValue: "-" },
          interestPaid: { value: 0, displayValue: "-" },
          principalRepaid: { value: 0, displayValue: "-" },
          outstandingBalance: { value: outstandingBalance, displayValue: currency(outstandingBalance).format() }
        }
        loanAmortizationSchedule.push(result);
      }
      else {
        const interestPaid: number = currency(outstandingBalance).multiply(j).value;
        const loanPayment: number = Math.min(R, currency(interestPaid).add(outstandingBalance).value);
        const principalRepaid: number = currency(loanPayment).subtract(interestPaid).value;
        outstandingBalance = currency(outstandingBalance).subtract(principalRepaid).value;
        // outstandingBalance = outstandingBalance <= 0.005 ? 0 : outstandingBalance;00
        const result: LoanAmortizationSchedule = {
          period: t,
          time: parseFloat((t / paymentFrequency).toFixed(3)),
          loanPayment: { value: loanPayment, displayValue: currency(loanPayment).format() },
          interestPaid: { value: interestPaid, displayValue: currency(interestPaid).format() },
          principalRepaid: { value: principalRepaid, displayValue: currency(principalRepaid).format() },
          outstandingBalance: { value: outstandingBalance, displayValue: currency(outstandingBalance).format() }
        }
        loanAmortizationSchedule.push(result);
      }
    }
    return loanAmortizationSchedule;
  }

  /**
   * Method used to determine label of payment frequency to use for display purposes.
   * @param paymentFrequency 
   * @returns Label used to describe payment frequency
   */
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