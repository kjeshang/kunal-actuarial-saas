import { Injectable } from '@angular/core';
import { DiscreteProbabilityDistributionTable, DiscreteProbabilityMetric, DiscreteProbabilityTableConfiguration } from '../discrete-probability.models';
import { isNil } from 'lodash';
import { DateTime } from 'luxon';
import jsPDF from 'jspdf';
import autoTable, { HookData } from 'jspdf-autotable';

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
        throw new Error("Probability Distribution Parameters must be provided to create the discrete probability distribution table and export to CSV!")
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
      csvRows.push(`${item.label},${item.value}`);
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
    for (const item of discreteProbabilityDistributionParameters) {
      if (isNil(item.value) || item.value === 0) {
        throw new Error("Distribution Parameters must be provided to create the discrete probability distribution table and generate the PDF!")
      }
    }
    // Instantiate JS Report and necessary parameters ---------------------------------------
    const doc: jsPDF = new jsPDF();
    let y = 20;
    // Set Report Title and Subtitle
    doc.setFontSize(18);
    doc.text("Discrete Probability Distribution Report", 10, y);
    y += 5;
    doc.setFontSize(9);
    const exportDate: string = DateTime.now().toLocaleString(DateTime.DATE_FULL);
    const exportTime: string = DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS);
    doc.text(`Export Time: ${exportDate} ${exportTime}`, 10, y);
    y += 10;
    // DISCRETE PROBABILITY DISTRIBUTION PARAMETERS -----------------------------------------------------------------------
    const distributionParameterColumns: string[][] = [["Distribution Parameter", "Value"]];
    const distributionParameterData: (string | number)[][] = discreteProbabilityDistributionParameters.map((item: DiscreteProbabilityMetric) => {
      const result: (string | number)[] = [item.label, item.displayValue];
      return result;
    });
    doc.setFontSize(14);
    doc.text("Probability Distribution Parameters", 10, y);
    y += 5
    autoTable(doc,
      {
        head: distributionParameterColumns,
        body: distributionParameterData,
        startY: y, // Margin from the top
        theme: 'grid', // Available themes: 'striped', 'grid', 'plain'
        headStyles: { fillColor: [41, 128, 185] }, // Custom header color
        columnStyles: {
          0: {
            fontStyle: "bold",         // Makes text bold
            fillColor: [240, 240, 240], // Light gray background for the row headers
            textColor: [50, 50, 50]     // Darker text color
          }
        },
        styles: {
          cellPadding: 2,
          // fontSize: 10
        },
        didDrawPage: (data: HookData) => {
          y = data.cursor?.y!;
        }
      }
    );
    y += 10;
    // DISCRETE PROBABILITY DISTRIBUTION SUMMARY METRICS ------------------------------------------------------------------
    const distributionSummaryMetricColumns: string[][] = [["Distribution Summary Metric", "Value"]];
    const distributionMetricData: (string | number)[][] = discreteProbabilityDistributionMetrics.map((item: DiscreteProbabilityMetric) => {
      const result: (string | number)[] = [item.label, item.displayValue];
      return result;
    });
    doc.setFontSize(14);
    doc.text("Probability Distribution Summary Metrics", 10, y);
    y += 5
    autoTable(doc,
      {
        head: distributionSummaryMetricColumns,
        body: distributionMetricData,
        startY: y, // Margin from the top
        theme: 'grid', // Available themes: 'striped', 'grid', 'plain'
        headStyles: { fillColor: [41, 128, 185] }, // Custom header color
        columnStyles: {
          0: {
            fontStyle: "bold",         // Makes text bold
            fillColor: [240, 240, 240], // Light gray background for the row headers
            textColor: [50, 50, 50]     // Darker text color
          }
        },
        styles: {
          cellPadding: 2,
          // fontSize: 10
        },
        didDrawPage: (data: HookData) => {
          y = data.cursor?.y!;
        }
      }
    );
    y += 10;
    // DISCRETE PROBABILITY DISTRIBUTION TABLE ------------------------------------------------------
    // Loan Amortization Schedule's Column Headings
    const tableColumns: string[][] = [
      discreteProbabilityConfiguration.map((item: DiscreteProbabilityTableConfiguration) => item.heading)
    ];
    // Loan Amortization Schedule's Data
    const tableData: (string | number)[][] = discreteProbabilityDistributionTable.map((item: DiscreteProbabilityDistributionTable) => {
      const result: (string | number)[] = [
        item.x,
        item.pmf.displayValue,
        item.cdf.displayValue,
        item.sf.displayValue,
      ];
      return result;
    });
    // Place Discrete Probability Distribution Table in Report
    doc.setFontSize(14);
    doc.text("Probability Distribution Table", 10, y);
    y += 5
    autoTable(doc,
      {
        head: tableColumns,
        body: tableData,
        startY: y, // Margin from the top
        theme: 'striped', // Available themes: 'striped', 'grid', 'plain'
        headStyles: { fillColor: [41, 128, 185] }, // Custom header color
        columnStyles: {
          0: { halign: 'left' },
          1: { halign: 'left' },
          2: { halign: 'left' },
          3: { halign: 'left' },
          4: { halign: 'left' },
          5: { halign: 'left' }
        },
      }
    );
    // Finalize Report --------------------------------------------------------------------
    // Add page numbers
    const pageCount: number = (doc as any).internal.getNumberOfPages();
    const pageWidth: number = doc.internal.pageSize.getWidth();
    const pageHeight: number = doc.internal.pageSize.getHeight();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      const pageText: string = `Page ${i} of ${pageCount}`;
      doc.text(pageText, pageWidth / 2, pageHeight - 10, { align: "center" });
    }
    // Create filename
    const pdfGenerationDatetime: string = DateTime.now().toISO();
    const filename: string = `DiscreteProbabilityDistribution-${pdfGenerationDatetime}.pdf`;
    // Save PDF
    doc.save(filename);
  }
}
