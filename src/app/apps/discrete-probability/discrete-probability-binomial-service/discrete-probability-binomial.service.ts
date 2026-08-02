import { Injectable } from '@angular/core';
import { BinomialParameters, DiscreteProbabilityMetric, DiscreteUniformParameters, GeometricParameters, NegativeBinomialParameters, PoissonParameters } from '../discrete-probability.models';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityBinomialService {

  /**
   * Method used to take parameters of the binomial distribution and format them for display purposes.
   * @param probabilityDistribution Name of the probability distribution
   * @param parameters n (number of trials), p (probability of success)
   * @returns Object array of DiscreteProbabilityMetric
   */
  formatBinomialParameters(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric[] | undefined {
    let binomialParameters: DiscreteProbabilityMetric[] | undefined = undefined;
    if (probabilityDistribution === "binomial" && !isNil(parameters) && "n" in parameters && "p" in parameters) {
      binomialParameters = [
        {
          metricType: "value",
          label: "Probability Distribution",
          value: undefined,
          displayValue: "Binomial Distribution"
        },
        {
          metricType: "value",
          label: "Number of Trials (n)",
          value: parameters.n,
          displayValue: parameters.n.toString()
        },
        {
          metricType: "probability",
          label: "Probability of Success (p)",
          value: parameters.p,
          displayValue: parameters.p.toFixed(4)
        }
      ];
    }
    return binomialParameters;
  }
}
