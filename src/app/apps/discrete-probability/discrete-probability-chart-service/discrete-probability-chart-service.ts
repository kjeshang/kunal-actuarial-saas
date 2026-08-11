import { Injectable } from '@angular/core';
import { DiscreteProbabilityDistributionTable } from '../discrete-probability.models';
import { LineChartData, MultiLineChartData } from '../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityChartService {

  /**
   * Method used to create line chart data to display probability mass function (i.e., p(x)).
   * @param discreteProbabilityDistributionTable
   * @returns LineChartData object
   */
  getPmfChartData(discreteProbabilityDistributionTable: DiscreteProbabilityDistributionTable[]): LineChartData {
    const chartData: LineChartData = {
      x: discreteProbabilityDistributionTable.map((item: DiscreteProbabilityDistributionTable) => item.x),
      y: discreteProbabilityDistributionTable.map((item: DiscreteProbabilityDistributionTable) => item.pmf.value),
      title: "Probability Mass Function",
      mode: "lines+markers",
      xAxisTitle: "x",
      yAxisTitle: "p(x)"
    };
    return chartData;
  }

  /**
   * Method used to create multi-chart data to compare cumulative distribution function (i.e., F(x)) against survival function (i.e., S(x)).
   * @param discreteProbabilityDistributionTable
   * @returns MultiLineChartData object
   */
  getCdfVsSfChartData(discreteProbabilityDistributionTable: DiscreteProbabilityDistributionTable[]): MultiLineChartData {
    const chartData: MultiLineChartData = {
      x: discreteProbabilityDistributionTable.map((item: DiscreteProbabilityDistributionTable) => item.x),
      y1: discreteProbabilityDistributionTable.map((item: DiscreteProbabilityDistributionTable) => item.cdf.value),
      y2: discreteProbabilityDistributionTable.map((item: DiscreteProbabilityDistributionTable) => item.sf.value),
      title: "Cumulative Density Function vs Survival Function",
      mode: "lines+markers",
      xAxisTitle: "x",
      yAxisTitle: "",
      y1Name: "F(x)",
      y2Name: "S(x)"
    };
    return chartData;
  }
}
