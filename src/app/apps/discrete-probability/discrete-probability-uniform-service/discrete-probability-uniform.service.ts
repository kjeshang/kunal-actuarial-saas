import { Injectable } from '@angular/core';
import { BinomialParameters, DiscreteUniformParameters, GeometricParameters, PoissonParameters, NegativeBinomialParameters, DiscreteProbabilityMetric } from '../discrete-probability.models';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityUniformService {

  formatDiscreteUniformParameters(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric[] | undefined {
    let discreteUniformParameters: DiscreteProbabilityMetric[] | undefined = undefined;
    if (probabilityDistribution === "discrete-uniform" && this.isDiscreteUniform(parameters)) {
      discreteUniformParameters = [
        {
          metricType: "value",
          label: "Probability Distribution",
          value: 1,
          displayValue: "Discrete Uniform Distribution"
        },
        {
          metricType: "value",
          label: "Minimum Value (a)",
          value: parameters.a,
          displayValue: parameters.a.toString()
        },
        {
          metricType: "value",
          label: "Maximum Value (b)",
          value: parameters.b,
          displayValue: parameters.b.toString()
        }
      ];
    }
    return discreteUniformParameters;
  }

  private isDiscreteUniform(parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): parameters is DiscreteUniformParameters {
    if (!isNil(parameters) && "a" in parameters && typeof parameters.a === 'number' && "b" in parameters && typeof parameters.b === 'number') {
      return true;
    }
    return false;
  }
}
