import { Injectable } from '@angular/core';
import { BinomialParameters, DiscreteProbabilityMetric, DiscreteUniformParameters, GeometricParameters, NegativeBinomialParameters, PoissonParameters } from '../discrete-probability.models';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityPoissonService {

  /**
   * Method used to take parameters of the poisson distribution and format them for display purposes.
   * @param probabilityDistribution Name of the probability distribution
   * @param parameters n (Maximum Display Horizon), λ (Mean Rate)
   * @returns Object array of DiscreteProbabilityMetric
   */
  formatPoissonParameters(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric[] | undefined {
    let poissonParameters: DiscreteProbabilityMetric[] | undefined = undefined;
    if (this.isPoisson(probabilityDistribution, parameters)) {
      poissonParameters = [
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
          metricType: "value",
          label: "Mean Rate (λ)",
          value: parameters.lambda,
          displayValue: parameters.lambda.toFixed(5)
        }
      ];
    }
    return poissonParameters;
  }

  /**
   * Method used to calculate expected value and/or variance of poisson distribution.
   * @param probabilityDistribution
   * @param parameters 
   * @param propertyType mean = Expected Value, variance = Variance
   * @returns Object of DiscreteProbabilityMetric
   */
  calculatePoissonEquidispersionProperty(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined, propertyType: 'mean' | 'variance') {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (this.isPoisson(probabilityDistribution, parameters)) {
      const value: number = parameters.lambda;
      metric = {
        metricType: "value",
        label: propertyType === 'mean' ? "E[X] : Expected Value" : "Var[X] : Variance",
        value: value,
        displayValue: value.toFixed(5)
      }
    }
    return metric;
  }

  /**
   * Method used to calculate second raw moment of poisson distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculatePoissonSecondMoment(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    const variance: number | undefined = this.calculatePoissonEquidispersionProperty(probabilityDistribution, parameters, "mean")?.value;
    const expectedValue: number | undefined = this.calculatePoissonEquidispersionProperty(probabilityDistribution, parameters, "variance")?.value;
    if (this.isPoisson(probabilityDistribution, parameters) && !isNil(variance) && !isNil(expectedValue)) {
      const value: number = variance + Math.pow(expectedValue, 2);
      metric = {
        metricType: "value",
        label: "E[X²] : Second Moment",
        value: value,
        displayValue: value.toFixed(5)
      };
    }
    return metric;
  }

  /**
   * Method used to calculate standard deviation of poisson distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculatePoissonStandardDeviation(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    const variance: number | undefined = this.calculatePoissonEquidispersionProperty(probabilityDistribution, parameters, "variance")?.value;
    if (this.isPoisson(probabilityDistribution, parameters) && !isNil(variance)) {
      const value: number = Math.sqrt(variance);
      metric = {
        metricType: "value",
        label: "SD(X) : Standard Deviation",
        value: value,
        displayValue: value.toFixed(5)
      };
    }
    return metric;
  }

  /**
   * Typeguard used to determine whether the provided parameters are that of the poisson distribution.
   * @param parameters 
   * @returns Boolean
   */
  private isPoisson(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): parameters is PoissonParameters {
    if (probabilityDistribution === "poisson" && !isNil(parameters) && "n" in parameters && typeof parameters.n === 'number' && "lambda" in parameters && typeof parameters.lambda === 'number') {
      return true;
    }
    return false;
  }
}
