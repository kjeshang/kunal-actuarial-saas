import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LoanStore } from '../loan.store';
import { isNil } from 'lodash';

@Component({
  selector: 'app-loan-amortization-table',
  imports: [MatTableModule],
  templateUrl: './loan-amortization-table.html',
  styleUrl: './loan-amortization-table.css',
})
export class LoanAmortizationTable {
  loanStore = inject(LoanStore);
  displayedColumns: string[] = ['time', 'loanPayment', 'interestPaid', 'principalRepaid', 'outstandingBalance'];

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
}
