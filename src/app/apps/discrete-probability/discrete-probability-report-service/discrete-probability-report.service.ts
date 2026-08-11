import { Injectable } from '@angular/core';
import { DiscreteProbabilityDistributionTable, DiscreteProbabilityMetric, DiscreteProbabilityTableConfiguration } from '../discrete-probability.models';
import { isNil } from 'lodash';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class DiscreteProbabilityReportService {

  /**
   * Method used to take discrete probability distribution's parameters, metrics, discrete probability distribution's table configuration, and the discrete probability distribution's table itself, and export the data into a CSV.
   */
  async exportToCSV(discreteProbabilityDistributionParameters: DiscreteProbabilityMetric[], discreteProbabilityDistributionMetrics: DiscreteProbabilityMetric[], discreteProbabilityConfiguration: DiscreteProbabilityTableConfiguration[], discreteProbabilityDistributionTable: DiscreteProbabilityDistributionTable[]): Promise<void> {
    for (const item of discreteProbabilityDistributionParameters) {
      if (isNil(item.value) || item.value === 0) {
        throw new Error("Probability Distribution Parameters must be provided to create the discrete probability distribution table and export CSV!")
      }
    }

    const csvRows: string[] = [];

    const exportDate: string = DateTime.now().toLocaleString(DateTime.DATE_FULL);
    const exportTime: string = DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS);

    // 1. Add Report Title & Timestamp
    csvRows.push("Discrete Probability Distribution Report");
    csvRows.push(`Export Date,${exportDate}`);
    csvRows.push(`Export Time,${exportTime}`);
    csvRows.push("");

    // 2. Add Discrete Probability Distribution Parameters
    csvRows.push("---DISCRETE PROBABILITY DISTRIBUTION PARAMETERS---");
    for (const item of discreteProbabilityDistributionParameters) {
      if (item.label === "Probability Distribution") {
        csvRows.push(`${item.label},${item.displayValue}`);
      }
      else {
        csvRows.push(`${item.label},${item.value}`);
      }
    }
    csvRows.push("");

    // 3. Add Discrete Probability Distribution Summary Metrics
    csvRows.push("---DISCRETE PROBABILITY DISTRIBUTION SUMMARY METRICS---")
    for (const item of discreteProbabilityDistributionMetrics) {
      csvRows.push(`${item.label},${item.value}`)
    }
    csvRows.push("");

    // 4. Add additional blank spaces
    csvRows.push("");
    csvRows.push("");

    // 5. Add Column Headings of Loan Amortization Schedule
    const columnHeadings: string[] = discreteProbabilityConfiguration.map((item: DiscreteProbabilityTableConfiguration) => item.heading);
    csvRows.push(`${columnHeadings.join(",")}`);

    // 6. Add Row Values to Loan Amortization Schedule
    for (const item of discreteProbabilityDistributionTable) {
      csvRows.push(`${item.index},${item.x},${item.pmf.value},${item.cdf.value},${item.sf.value}`);
    }

    // 7. Create filename of CSV
    const csvExportDatetime: string = DateTime.now().toISO();
    const filename: string = `DiscreteProbabilityDistributionTable-${csvExportDatetime}.csv`;

    // 8. Trigger the native browser download
    const csvContent: string = csvRows.join('\n');
    const blob: Blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url: string = URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Method used to take discrete probability distribution's parameters, metrics, discrete probability distribution's table configuration, and the discrete probability distribution's table itself, and export the data into a PDF.
   */
  async generatePDF(discreteProbabilityDistributionParameters: DiscreteProbabilityMetric[], discreteProbabilityDistributionMetrics: DiscreteProbabilityMetric[], discreteProbabilityConfiguration: DiscreteProbabilityTableConfiguration[], discreteProbabilityDistributionTable: DiscreteProbabilityDistributionTable[]): Promise<void> {

  }
}
