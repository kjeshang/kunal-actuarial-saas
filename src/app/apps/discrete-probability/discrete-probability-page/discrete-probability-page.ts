import { Component, inject } from '@angular/core';
import { DiscreteProbabilityParameters } from '../discrete-probability-parameters/discrete-probability-parameters';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { DiscreteProbabilitySummaryCard } from '../discrete-probability-summary-card/discrete-probability-summary-card';
import { DiscreteProbabilityStore } from '../discrete-probability.store';
import { DiscreteProbabilityTable } from '../discrete-probability-table/discrete-probability-table';
import { DiscreteProbabilityTableConfiguration } from '../discrete-probability.models';

@Component({
  selector: 'app-discrete-probability-page',
  imports: [FeatureContainer, DiscreteProbabilityParameters, DiscreteProbabilitySummaryCard, DiscreteProbabilityTable],
  templateUrl: './discrete-probability-page.html',
  styleUrl: './discrete-probability-page.css',
})
export class DiscreteProbabilityPage {
  discreteProbabilityStore = inject(DiscreteProbabilityStore);

  discreteProbabilityConfiguration: DiscreteProbabilityTableConfiguration[] = [
    {
      name: "x",
      heading: "x",
      textPosition: "!text-left"
    },
    {
      name: "pmf",
      heading: "p(x)",
      textPosition: "!text-left"
    },
    {
      name: "cdf",
      heading: "F(x)",
      textPosition: "!text-left"
    },
    {
      name: "sf",
      heading: "S(x)",
      textPosition: "!text-left"
    }
  ];
}
