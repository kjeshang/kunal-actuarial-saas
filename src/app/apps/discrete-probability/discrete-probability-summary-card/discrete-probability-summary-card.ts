import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DiscreteProbabilityMetric } from '../discrete-probability.models';
import { isNil } from 'lodash';

@Component({
  selector: 'app-discrete-probability-summary-card',
  imports: [MatCardModule],
  templateUrl: './discrete-probability-summary-card.html',
  styleUrl: './discrete-probability-summary-card.css',
})
export class DiscreteProbabilitySummaryCard {
  @Input() metric?: DiscreteProbabilityMetric;

  /**
   * Getter to retrieve the label value from metric object.
   */
  get label(): string | undefined {
    if(!isNil(this.metric?.label)) {
      return this.metric.label;
    }
    return undefined;
  }

  /**
   * Getter to retrieve the displayValue from metric object.
   */
  get displayValue(): string | undefined {
    if(!isNil(this.metric?.displayValue)) {
      return this.metric.displayValue;
    }
    return undefined;
  }
}
