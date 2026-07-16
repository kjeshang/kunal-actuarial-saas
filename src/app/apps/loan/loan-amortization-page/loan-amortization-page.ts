import { Component, inject } from '@angular/core';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { LoanParameters } from '../loan-parameters/loan-parameters';
import { LoanSummaryCard } from '../loan-summary-card/loan-summary-card';
import { LoanStore } from '../loan.store';
import { LoanAmortizationTable } from '../loan-amortization-table/loan-amortization-table';
import { MatTabsModule } from '@angular/material/tabs';
import { LineChart } from '../../../shared/line-chart/line-chart';
import { StackedAreaChart } from "../../../shared/stacked-area-chart/stacked-area-chart";

@Component({
  selector: 'app-loan-amortization-page',
  imports: [FeatureContainer, LoanParameters, LoanSummaryCard, LoanAmortizationTable, MatTabsModule, LineChart, StackedAreaChart],
  templateUrl: './loan-amortization-page.html',
  styleUrl: './loan-amortization-page.css',
})
export class LoanAmortizationPage {
  loanStore = inject(LoanStore);
}
