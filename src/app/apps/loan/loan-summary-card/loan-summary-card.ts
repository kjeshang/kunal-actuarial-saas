import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoanSummaryMetric } from '../loan.models';
import { isNil } from 'lodash';

@Component({
  selector: 'app-loan-summary-card',
  imports: [MatCardModule],
  templateUrl: './loan-summary-card.html',
  styleUrl: './loan-summary-card.css',
})
export class LoanSummaryCard {
  @Input() metric!: LoanSummaryMetric;

  /**
   * Method used to either display loan summary metric value, or show a placeholder value as the user inputs their loan parameters.
   * @param metric Loan Summary Metric containing metric type, label, value, and display value.
   * @returns Display value of loan summary metric
   */
  showMetricDisplayValue(metric: LoanSummaryMetric): string {
    let displayValue: string = "";
    if (metric.metricType === 'rate' && (isNil(metric.value) || !metric.value || metric.displayValue === `${Infinity}%`)) {
      displayValue = "0.0000%"
    }
    else if (metric.metricType === 'amount' && (isNil(metric.value) || !metric.value || displayValue === `$${Infinity}`) || metric.value === Infinity) {
      displayValue = "$0.00"
    }
    else {
      displayValue = metric.displayValue;
    }
    return displayValue;
  }
}
