import { Injectable } from '@angular/core';
import { BinomialParameters, DiscreteProbabilityDistributionTable, DiscreteProbabilityMetric, DiscreteUniformParameters, GeometricParameters, NegativeBinomialParameters, PoissonParameters } from '../discrete-probability.models';
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
          label: "Distribution Version",
          value: 1,
          displayValue: parameters.version === "trials" ? "Total Trials" : "Number of Failures"
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
   * Method used to calculate expected value of geometric distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateGeometricExpectedValue(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (this.isGeometric(probabilityDistribution, parameters)) {
      const value: number = parameters.version === "trials" ? 1 / parameters.p : (1 - parameters.p) / parameters.p;
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
   * Method used to calculate second raw moment of geometric distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateGeometricSecondMoment(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    const variance: number | undefined = this.calculateGeometricVariance(probabilityDistribution, parameters)?.value;
    const expectedValue: number | undefined = this.calculateGeometricExpectedValue(probabilityDistribution, parameters)?.value;
    if (this.isGeometric(probabilityDistribution, parameters) && !isNil(variance) && !isNil(expectedValue)) {
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
   * Method used to calculate variance of geometric distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateGeometricVariance(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (this.isGeometric(probabilityDistribution, parameters)) {
      const value: number = (1 - parameters.p) / Math.pow(parameters.p, 2);
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
   * Method used to calculate standard deviation of geometric distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateGeometricStandardDeviation(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    const variance: number | undefined = this.calculateGeometricVariance(probabilityDistribution, parameters)?.value;
    if (this.isGeometric(probabilityDistribution, parameters) && !isNil(variance)) {
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
     * Method used to create geometric distribution table containing index, x, n, pmf, cdf, and sf.
     * pmf = Probability Mass Function
     * cdf = Cumulative Density Function
     * sf = Survival Function
     * @param probabilityDistribution 
     * @param parameters 
     * @returns Object Array of DiscreteProbabilityDistributionTable
     */
  createGeometricDistributionTable(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityDistributionTable[] {
    let discreteProbabilityDistributionTable: DiscreteProbabilityDistributionTable[] = [];
    if (this.isGeometric(probabilityDistribution, parameters)) {
      const startingIndex: number = parameters.version === "trials" ? 1 : 0;
      let cdf: number = 0;
      for (let i = startingIndex; i <= parameters.n; i++) {
        const x: number = i;
        const pmf: number = this.calculateGeometricPMF(parameters.version, parameters.p, x);
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
   * Method used to calculate the probability mass function (pmf) of a geometric distribution for a given value of x.
   * Note: Using the log-space method to calculate pmf.
   * @param p Probability of Successs
   * @param x 
   * @returns number
   */
  private calculateGeometricPMF(version: string, p: number, x: number): number {
    const result: number = version === "trials" ? Math.exp(Math.log(p) + x * Math.log(1 - p)) : Math.exp(Math.log(p) + (x - 1) * Math.log(1 - p));
    return result;
  }

  /**
   * Typeguard used to determine whether the provided parameters are that of the geometric distribution.
   * @param parameters 
   * @returns Boolean
   */
  private isGeometric(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): parameters is GeometricParameters {
    if (probabilityDistribution === "geometric" && !isNil(parameters) && "version" in parameters && typeof parameters.version === 'string' && "n" in parameters && typeof parameters.n === 'number' && "p" in parameters && typeof parameters.p === 'number') {
      return true;
    }
    return false;
  }
}
