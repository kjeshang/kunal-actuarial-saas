import { Injectable } from '@angular/core';
import { BinomialParameters, DiscreteUniformParameters, GeometricParameters, PoissonParameters, NegativeBinomialParameters, DiscreteProbabilityMetric, DiscreteProbabilityDistributionTable } from '../discrete-probability.models';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityUniformService {

  /**
   * Method used to take parameters of the discrete uniform distribution and format them for display purposes.
   * @param probabilityDistribution Name of the probability distribution
   * @param parameters a (Minimum Value), b (Maximum Value)
   * @returns Object array of DiscreteProbabilityMetric
   */
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

  /**
   * Method used to calculate expected value of discrete uniform distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateUniformExpectedValue(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (probabilityDistribution === "discrete-uniform" && this.isDiscreteUniform(parameters)) {
      const value: number = (parameters.a + parameters.b) / 2;
      metric = {
        metricType: "value",
        label: "E[X] : Expected Value",
        value: value,
        displayValue: value.toFixed(5)
      };
    }
    return metric;
  }

  /**
   * Method used to calculate second raw moment of discrete uniform distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateUniformSecondMoment(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    const variance: number | undefined = this.calculateDiscreteUniformVariance(probabilityDistribution, parameters)?.value;
    const expectedValue: number | undefined = this.calculateUniformExpectedValue(probabilityDistribution, parameters)?.value;
    if (probabilityDistribution === "discrete-uniform" && this.isDiscreteUniform(parameters) && !isNil(variance) && !isNil(expectedValue)) {
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
   * Method used to calculate variance of discrete uniform distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateDiscreteUniformVariance(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (probabilityDistribution === "discrete-uniform" && this.isDiscreteUniform(parameters)) {
      const n: number = this.calculateTotalOutcomes(parameters.a, parameters.b);
      const value: number = (Math.pow(n, 2) - 1) / 12;
      metric = {
        metricType: "value",
        label: "Var[X] : Variance",
        value: value,
        displayValue: value.toFixed(5)
      };
    }
    return metric;
  }

  /**
   * Method used to calculate standard deviation of discrete uniform distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateUniformStandardDeviation(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    const variance: number | undefined = this.calculateDiscreteUniformVariance(probabilityDistribution, parameters)?.value;
    if (probabilityDistribution === "discrete-uniform" && this.isDiscreteUniform(parameters) && !isNil(variance)) {
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
     * Method used to create uniform distribution table containing index, x, n, pmf, cdf, and sf.
     * pmf = Probability Mass Function
     * cdf = Cumulative Density Function
     * sf = Survival Function
     * @param probabilityDistribution 
     * @param parameters 
     * @returns Object Array of DiscreteProbabilityDistributionTable
     */
  createUniformDistributionTable(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityDistributionTable[] {
    let discreteProbabilityDistributionTable: DiscreteProbabilityDistributionTable[] = [];
    if (probabilityDistribution === "discrete-uniform" && this.isDiscreteUniform(parameters)) {
      let cdf: number = 0;
      const n: number = this.calculateTotalOutcomes(parameters.a, parameters.b);
      const pmf: number = 1 / n;
      for (let i = parameters.a; i <= parameters.b; i++) {
        const x: number = i;
        cdf = Math.min(1, pmf + cdf);
        const sf: number = Math.max(0, 1 - cdf);
        const result: DiscreteProbabilityDistributionTable = {
          index: i,
          x: x,
          pmf: { value: pmf, displayValue: pmf.toFixed(5) },
          cdf: { value: cdf, displayValue: cdf.toFixed(5) },
          sf: { value: sf, displayValue: sf.toFixed(5) }
        }
        discreteProbabilityDistributionTable.push(result);
      }
    }
    return discreteProbabilityDistributionTable;
  }

  /**
   * Method used to calculate total outcomes (i.e., n) of the discrete uniform distribution
   * @param a Minimum Value
   * @param b Maximum Value
   * @returns number
   */
  private calculateTotalOutcomes(a: number, b: number): number {
    const totalOutcomes: number = b - a + 1;
    return totalOutcomes;
  }

  /**
   * Typeguard used to determine whether the provided parameters are that of the discrete uniform distribution.
   * @param parameters 
   * @returns Boolean
   */
  private isDiscreteUniform(parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): parameters is DiscreteUniformParameters {
    if (!isNil(parameters) && "a" in parameters && typeof parameters.a === 'number' && "b" in parameters && typeof parameters.b === 'number') {
      return true;
    }
    return false;
  }
}
