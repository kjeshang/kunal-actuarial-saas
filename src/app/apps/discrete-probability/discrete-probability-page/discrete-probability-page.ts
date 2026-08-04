import { Component, inject } from '@angular/core';
import { DiscreteProbabilityParameters } from '../discrete-probability-parameters/discrete-probability-parameters';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { DiscreteProbabilitySummaryCard } from '../discrete-probability-summary-card/discrete-probability-summary-card';
import { DiscreteProbabilityStore } from '../discrete-probability.store';
import { isNil } from 'lodash';

@Component({
  selector: 'app-discrete-probability-page',
  imports: [FeatureContainer, DiscreteProbabilityParameters, DiscreteProbabilitySummaryCard],
  templateUrl: './discrete-probability-page.html',
  styleUrl: './discrete-probability-page.css',
})
export class DiscreteProbabilityPage {
  discreteProbabilityStore = inject(DiscreteProbabilityStore);

  
}
