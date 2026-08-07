import { inject, Injectable } from '@angular/core';
import { BinomialParameters, DiscreteProbabilityDistributionTable, DiscreteProbabilityMetric, DiscreteProbabilityTableValue, DiscreteUniformParameters, GeometricParameters, NegativeBinomialParameters, PoissonParameters } from '../discrete-probability.models';
import { isNil, sumBy } from 'lodash';
import { DiscreteProbabilityCalculationService } from '../discrete-probability-calulation-service/discrete-probability-calculation.service';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityBinomialService {

  discreteProbabilityCalculationService: DiscreteProbabilityCalculationService = inject(DiscreteProbabilityCalculationService);

  /**
   * Method used to take parameters of the binomial distribution and format them for display purposes.
   * @param probabilityDistribution Name of the probability distribution
   * @param parameters n (number of trials), p (probability of success)
   * @returns Object array of DiscreteProbabilityMetric
   */
  formatBinomialParameters(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric[] | undefined {
    let binomialParameters: DiscreteProbabilityMetric[] | undefined = undefined;
    if (probabilityDistribution === "binomial" && !isNil(parameters) && "n" in parameters && "p" in parameters && typeof parameters.n === 'number' && typeof parameters.p === 'number') {
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
          displayValue: parameters.p.toFixed(5)
        }
      ];
    }
    return binomialParameters;
  }

  /**
   * Method used to calcualte expected value of binomial distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateBinomialExpectedValue(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (probabilityDistribution === "binomial" && !isNil(parameters) && "n" in parameters && "p" in parameters) {
      const value: number = parameters.n * parameters.p;
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
   * Method used to calculate second moment of binomial distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateBinomialSecondMoment(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (probabilityDistribution === "binomial" && !isNil(parameters) && "n" in parameters && "p" in parameters) {
      const value: number = (parameters.n * parameters.p) * (1 - parameters.p + (parameters.n * parameters.p));
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
   * Method used to calculate variance of binomial distribution.
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object of DiscreteProbabilityMetric
   */
  calculateBinomialVariance(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityMetric | undefined {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (probabilityDistribution === "binomial" && !isNil(parameters) && "n" in parameters && "p" in parameters) {
      const value = parameters.n * parameters.p * (1 - parameters.p);
      metric = {
        metricType: "value",
        label: "Var[X] : Variance",
        value: value,
        displayValue: value.toFixed(5)
      };
    }
    return metric;
  }

  calculateBinomialStandardDeviation(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined) {
    let metric: DiscreteProbabilityMetric | undefined = undefined;
    if (probabilityDistribution === "binomial" && !isNil(parameters) && "n" in parameters && "p" in parameters) {
      const variance = this.calculateBinomialVariance(probabilityDistribution, parameters);
      if (!isNil(variance) && !isNil(variance.value)) {
        const value = Math.sqrt(variance.value);
        metric = {
          metricType: "value",
          label: "σ(X) : Standard Deviation",
          value: value,
          displayValue: value.toFixed(5)
        };
      }
    }
    return metric;
  }

  /**
   * Method used to create binomial distribution table containing index, x, n, pmf, cdf, and sf.
   * pmf = Probability Mass Function
   * cdf = Cumulative Density Function
   * sf = Survival Function
   * @param probabilityDistribution 
   * @param parameters 
   * @returns Object Array of DiscreteProbabilityDistributionTable
   */
  createBinomialDistributionTable(probabilityDistribution: string, parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): DiscreteProbabilityDistributionTable[] {
    let discreteProbabilityDistributionTable: DiscreteProbabilityDistributionTable[] = [];
    if (probabilityDistribution === "binomial" && !isNil(parameters) && "n" in parameters && "p" in parameters) {
      let cdf: number = 0;
      for (let i = 0; i <= parameters.n; i++) {
        const x: number = i;
        const pmf: number = this.calculateBinomialPMF(parameters.n, x, parameters.p);
        cdf = Math.min(1, pmf + cdf);
        const sf: number = Math.min(0, 1 - cdf);
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
   * Method used to calculate the probability mass function of a binomial distribution for a given value of x.
   * Bound: 0 <= x <= n
   * @param n Number of Trials
   * @param x 
   * @param p Probability of Success
   * @returns number
   */
  private calculateBinomialPMF(n: number, x: number, p: number): number {
    let pmfValue: number = 0;
    const calcs: DiscreteProbabilityCalculationService = this.discreteProbabilityCalculationService;
    if (x < 0 || x > n || !Number.isInteger(x)) {
      pmfValue = 0;
    }
    else if (p === 0) {
      pmfValue = x === 0 ? 1 : 0;
    }
    else if (p === 1) {
      pmfValue = x === n ? 1 : 0;
    }
    else {
      const logPmf: number = Math.log(calcs.logCombination(n, x)) + x * Math.log(p) + (n - x) * Math.log(1 - p);
      pmfValue = Math.exp(logPmf);
    }
    return pmfValue;
  }
}
