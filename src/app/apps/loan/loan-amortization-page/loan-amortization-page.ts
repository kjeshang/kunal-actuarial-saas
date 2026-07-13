import { Component, inject } from '@angular/core';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { LoanParameters } from '../loan-parameters/loan-parameters';
import { LoanSummaryCard } from '../loan-summary-card/loan-summary-card';
import { LoanStore } from '../loan.store';

@Component({
  selector: 'app-loan-amortization-page',
  imports: [FeatureContainer, LoanParameters, LoanSummaryCard],
  templateUrl: './loan-amortization-page.html',
  styleUrl: './loan-amortization-page.css',
})
export class LoanAmortizationPage {
  loanStore = inject(LoanStore);
}
