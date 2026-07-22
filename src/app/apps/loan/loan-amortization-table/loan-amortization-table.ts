import { Component, inject, Input, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LoanStore } from '../loan.store';
import { isNil } from 'lodash';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoanAmortizationSchedule, LoanSummaryMetric, LoanTableConfiguration } from '../loan.models';
import { LoanReportService } from '../loan-report.service';

@Component({
  selector: 'app-loan-amortization-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressBarModule],
  templateUrl: './loan-amortization-table.html',
  styleUrl: './loan-amortization-table.css',
})
export class LoanAmortizationTable {
  @Input() loanTableConfiguration!: LoanTableConfiguration[];
  @Input() loanParameters!: LoanSummaryMetric[];
  @Input() loanSummaryMetrics!: LoanSummaryMetric[];
  @Input() loanAmortizationSchedule!: LoanAmortizationSchedule[];

  // loanStore = inject(LoanStore);
  private loanReportService = inject(LoanReportService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  showProgressBar: boolean = false;

  /**
   * Get name of column to be populated in table.
   */
  get displayedColumns(): string[] {
    const list: string[] = [];
    for (const item of this.loanTableConfiguration) {
      list.push(item.name);
    }
    return list;
  }

  /**
   * Method used to check whether loan payment, interest paid, principal repaid, or outstanding balance values are valid; if not, "$0.00".
   * @param value Period, Loan Payment, Interest Paid, Principal Repaid, Outstanding Balance
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

  /**
   * On button click, asynchronously call function to export loan amortization schedule data into CSV.
   */
  async triggerExportToCSV(): Promise<void> {
    try {
      // Show Progress Bar
      this.showProgressBar = true;
      // Call Report Service Function to Export Loan Amortization Data to CSV
      await this.loanReportService.exportToCSV(
        this.loanParameters,
        this.loanSummaryMetrics,
        this.loanTableConfiguration,
        this.loanAmortizationSchedule
      );
      // Show notification that CSV has been exported
      this._snackBar.open("Loan Amortization Exported to CSV!", "Dismiss", {
        duration: 3000,
        verticalPosition: "top"
      });
      // Hide Progress Bar
      this.showProgressBar = false;
    }
    catch (error: unknown) {
      // In the event an error was thrown by the report service function, show a notification indicating the error message.
      if (error instanceof Error) {
        this._snackBar.open(`${error.message}`, "Dismiss", {
          duration: 5000,
          verticalPosition: "top"
        });
        // Hide Progress Bar
        this.showProgressBar = false;
      }
    }
  }

  /**
   * On button click, asynchronously call function to generate loan amortization schedule data into PDF.
   */
  async triggerGeneratePDF(): Promise<void> {
    try {
      // Show Progress Bar
      this.showProgressBar = true;
      // Call Report Service Function to Generate Loan Amortization Data to PDF
      await this.loanReportService.generatePDF(
        this.loanParameters,
        this.loanTableConfiguration,
        this.loanAmortizationSchedule
      );
      // Hide Progress Bar
      this.showProgressBar = false;
    }
    catch (error: unknown) {
      // In the event an error was thrown by the report service function, show a notification indicating the error message.
      if (error instanceof Error) {
        this._snackBar.open(`${error.message}`, "Dismiss", {
          duration: 5000,
          verticalPosition: "top"
        });
        // Hide Progress Bar
        this.showProgressBar = false;
      }
    }
  }

}
