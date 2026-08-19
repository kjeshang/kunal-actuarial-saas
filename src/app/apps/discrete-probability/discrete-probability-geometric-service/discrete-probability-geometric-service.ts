import { Injectable } from '@angular/core';
import { BinomialParameters, DiscreteProbabilityMetric, DiscreteUniformParameters, GeometricParameters, NegativeBinomialParameters, PoissonParameters } from '../discrete-probability.models';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityGeometricService {

  /**
   * Method used to take parameters of the geometric distribution and format them for display purposes.
   * @param probabilityDistribution Name of the probability distribution
   * @param parameters n (Maximum Display Horizon), p (Probability of Success)
   * @returns Object array of DiscreteProbabilityMetric
   */
  formatGeometricParameters(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric[] | undefined {
    let geometricParameters: DiscreteProbabilityMetric[] | undefined = undefined;
    if (this.isGeometric(probabilityDistribution, parameters)) {
      geometricParameters = [
        {
          metricType: "value",
          label: "Probability Distribution",
          value: 1,
          displayValue: "Geometric Distribution"
        },
        {
          metricType: "value",
          label: "Maximum Display Horizon (n)",
          value: parameters.n,
          displayValue: parameters.n.toString()
        },
        {
          metricType: "probability",
          label: "Probability of Success (p)",
          value: parameters.p,
          displayValue: parameters.p.toFixed(5)
        }
      ];
    }
    return geometricParameters;
  }

  /**
   * Method used to calculate the probability mass function (pmf) of a geometric distribution for a given value of x.
   * Note: Using the log-space method to calculate pmf.
   * @param p Probability of Successs
   * @param x 
   * @returns number
   */
  private calculateGeometricPMF(p: number, x: number): number {
    const result: number = Math.exp(Math.log(p) + x * Math.log(1 - p));
    return result;
  }

  /**
   * Typeguard used to determine whether the provided parameters are that of the geometric distribution.
   * @param parameters 
   * @returns Boolean
   */
  private isGeometric(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): parameters is GeometricParameters {
    if (probabilityDistribution === "geometric" && !isNil(parameters) && "n" in parameters && typeof parameters.n === 'number' && "p" in parameters && typeof parameters.p === 'number') {
      return true;
    }
    return false;
  }
}
