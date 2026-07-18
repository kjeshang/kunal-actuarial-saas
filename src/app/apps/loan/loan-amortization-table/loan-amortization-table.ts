import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LoanStore } from '../loan.store';
import { isNil } from 'lodash';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoanAmortizationSchedule, LoanSummaryMetric } from '../loan.models';
import { LoanReportService } from '../loan-report.service';

@Component({
  selector: 'app-loan-amortization-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressBarModule],
  templateUrl: './loan-amortization-table.html',
  styleUrl: './loan-amortization-table.css',
})
export class LoanAmortizationTable {
  loanStore = inject(LoanStore);
  private loanReportService = inject(LoanReportService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['time', 'loanPayment', 'interestPaid', 'principalRepaid', 'outstandingBalance'];
  showProgressBar: boolean = false;

  /**
   * Method used to check whether loan payment, interest paid, principal repaid, or outstanding balance values are valid; if not, "$0.00".
   * @param value Loan Payment, Interest Paid, Principal Repaid, Outstanding Balance
   * @returns Display value or "$0.00"
   */
  showDisplayValue(value: string): string {
    let displayValue: string = "";
    if (isNil(value) || !value || value === `$${Infinity}` || value === '-$NaN') {
      displayValue = "$0.00";
    }
    else {
      displayValue = value;
    }
    return displayValue;
  }

  async triggerExportToCSV(): Promise<void> {
    this.showProgressBar = true;
    try {
      const loanParameters: { label: string, value: number }[] = [
        {
          label: "Loan Amount",
          value: this.loanStore.loanAmount(),
        },
        {
          label: "Annual Effective Interest Rate",
          value: this.loanStore.interestRate(),
        },
        {
          label: "Term of Loan (in years)",
          value: this.loanStore.termOfLoan(),
        },
        {
          label: "Payment Frequency (per year)",
          value: this.loanStore.paymentFrequency()
        }
      ];
      const loanSummaryMetrics: LoanSummaryMetric[] = [
        this.loanStore.periodicPaymentAmount(),
        this.loanStore.totalInterestPaid(),
        this.loanStore.totalNumberOfPeriods(),
        this.loanStore.periodicEffectiveInterestRate(),
        this.loanStore.periodicNominalInterestRate(),
        this.loanStore.periodicRateOfDiscount(),
      ];
      const loanAmortizationScheduleColumnHeadings: string[] = ["Time (in years)", "Loan Payment	Interest Paid at Time t", "Principal Repaid at Time t", "Outstanding Balance at Time t"];
      const loanAmortizationSchedule: LoanAmortizationSchedule[] = this.loanStore.loanAmortizationSchedule();

      await this.loanReportService.exportToCSV(loanParameters, loanSummaryMetrics, loanAmortizationScheduleColumnHeadings, loanAmortizationSchedule);
      this._snackBar.open("Loan Amortization Exported to CSV!", "Dismiss", {
        duration: 3000,
        verticalPosition: "top"
      });

      this.showProgressBar = false;
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        this._snackBar.open(`${error.message}`, "Dismiss", {
          duration: 5000,
          verticalPosition: "top"
        });
        this.showProgressBar = false;
      }
    }
  }

}
