import { Component } from '@angular/core';
import { DiscreteProbabilityParameters } from '../discrete-probability-parameters/discrete-probability-parameters';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';

@Component({
  selector: 'app-discrete-probability-page',
  imports: [FeatureContainer, DiscreteProbabilityParameters],
  templateUrl: './discrete-probability-page.html',
  styleUrl: './discrete-probability-page.css',
})
export class DiscreteProbabilityPage {}
