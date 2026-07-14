import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LoanStore } from '../loan.store';

@Component({
  selector: 'app-loan-amortization-table',
  imports: [MatTableModule],
  templateUrl: './loan-amortization-table.html',
  styleUrl: './loan-amortization-table.css',
})
export class LoanAmortizationTable {
  loanStore = inject(LoanStore);
  displayedColumns: string[] = ['time', 'loanPayment', 'interestPaid', 'principalRepaid', 'outstandingBalance'];

}
