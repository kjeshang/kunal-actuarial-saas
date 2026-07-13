import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoanSummaryMetric } from '../loan.models';

@Component({
  selector: 'app-loan-summary-card',
  imports: [MatCardModule],
  templateUrl: './loan-summary-card.html',
  styleUrl: './loan-summary-card.css',
})
export class LoanSummaryCard {
  @Input() metric!: LoanSummaryMetric;
}
