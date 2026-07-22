import { Component, inject } from '@angular/core';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { LoanParameters } from '../loan-parameters/loan-parameters';
import { LoanSummaryCard } from '../loan-summary-card/loan-summary-card';
import { LoanStore } from '../loan.store';
import { LoanAmortizationTable } from '../loan-amortization-table/loan-amortization-table';
import { MatTabsModule } from '@angular/material/tabs';
import { LineChart } from '../../../shared/line-chart/line-chart';
import { StackedAreaChart } from "../../../shared/stacked-area-chart/stacked-area-chart";
import { PieChart } from '../../../shared/pie-chart/pie-chart';
import { MultiLineChart } from '../../../shared/multi-line-chart/multi-line-chart';
import { LoanTableConfiguration } from '../loan.models';

@Component({
  selector: 'app-loan-amortization-page',
  imports: [FeatureContainer, LoanParameters, LoanSummaryCard, LoanAmortizationTable, MatTabsModule, LineChart, StackedAreaChart, PieChart, MultiLineChart],
  templateUrl: './loan-amortization-page.html',
  styleUrl: './loan-amortization-page.css',
})
export class LoanAmortizationPage {
  loanStore = inject(LoanStore);

  loanTableConfiguration: LoanTableConfiguration[] = [
    {
      name: "period",
      heading: "Period",
      textPosition: "!text-center"
    },
    {
      name: "time",
      heading: "Time (in years)",
      textPosition: "!text-center"
    },
    {
      name: "loanPayment",
      heading: "Loan Payment",
      textPosition: "!text-right"
    },
    {
      name: "interestPaid",
      heading: "Interest Paid at Time t",
      textPosition: "!text-right"
    },
    {
      name: "principalRepaid",
      heading: "Principal Repaid at Time t",
      textPosition: "!text-right"
    },
    {
      name: "outstandingBalance",
      heading: "Outstanding Balance at Time t",
      textPosition: "!text-right"
    }
  ];
}
