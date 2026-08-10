import { Component, inject } from '@angular/core';
import { DiscreteProbabilityParameters } from '../discrete-probability-parameters/discrete-probability-parameters';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { DiscreteProbabilitySummaryCard } from '../discrete-probability-summary-card/discrete-probability-summary-card';
import { DiscreteProbabilityStore } from '../discrete-probability.store';
import { DiscreteProbabilityTable } from '../discrete-probability-table/discrete-probability-table';
import { DiscreteProbabilityTableConfiguration } from '../discrete-probability.models';
import { MatTabsModule } from '@angular/material/tabs';
import { LineChart } from '../../../shared/line-chart/line-chart';
import { LineChartData } from '../../../shared/models';
import { isNil } from 'lodash';

@Component({
  selector: 'app-discrete-probability-page',
  imports: [FeatureContainer, DiscreteProbabilityParameters, DiscreteProbabilitySummaryCard, DiscreteProbabilityTable, MatTabsModule, LineChart],
  templateUrl: './discrete-probability-page.html',
  styleUrl: './discrete-probability-page.css',
})
export class DiscreteProbabilityPage {
  discreteProbabilityStore = inject(DiscreteProbabilityStore);

  discreteProbabilityConfiguration: DiscreteProbabilityTableConfiguration[] = [
    {
      name: "x",
      heading: "x",
      textPosition: "!text-center"
    },
    {
      name: "pmf",
      heading: "p(x)",
      textPosition: "!text-center"
    },
    {
      name: "cdf",
      heading: "F(x)",
      textPosition: "!text-center"
    },
    {
      name: "sf",
      heading: "S(x)",
      textPosition: "!text-center"
    }
  ];
}
