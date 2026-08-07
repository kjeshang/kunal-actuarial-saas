import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityCalculationService {

  /**
   * Function that implements an ITERATIVE METHOD to calculate a combination using parameters n and x.
   * This method leverages symmetry: C(n, x) == C(n, n - x), and the multiplying/dividing step-by-step helps prevent integer overflow for larger values of n.
   * NOTE - BEST FOR SPEED & GENERAL USE.
   * @param n 
   * @param x
   * @returns number 
   */
  combination(n: number, x: number): number {
    let result: number = 0;
    if (x < 0 || x > n) {
      result = 0;
    }
    else if (x === 0 || x === n) {
      result = 1;
    }
    else {
      result = 1;
      for (let i = 1; i <= x; i++) {
        result = (result * (n - x + i)) / i;
      }
    }
    return result;
  }

  /**
   * Function that implements an LOG-GAMMA / LOG-FACTORIAL METHOD to calculate a combination using parameters n and x.
   * This method is good when 'n' is very large (e.g., 'n' > 500$), even the iterative combination product can overflow Number. Computing in log-space keeps all calculations within normal numeric limits.
   * NOTE - BEST FOR LARGE 'n' IN ACTUARIAL TOOLS.
   * @param n 
   * @param x 
   * @returns number
   */
  logCombination(n: number, x: number): number {
    let result: number = 0;
    if (x < 0 || x > n) {
      // result = 0;
      result = -Infinity;
    }
    else if (x === 0 || x === n) {
      result = 1;
    }
    else {
      result = this.logGamma(n) - this.logGamma(x) - this.logGamma(n - x);
    }
    return result;
  }

  /**
   * Logarithm of Gamma function (equivalent to ln(n!))
   * Implements Stirling's approximation or standard log-factorial lookup.
   * @param n 
   * @returns number
   */
  private logGamma(n: number): number {
    let result: number = 0;
    if (n <= 1) {
      result = 0;
    }
    else {
      for (let i = 2; i <= n; i++) {
        result += Math.log(i);
      }
    }
    return result;
  }
}
