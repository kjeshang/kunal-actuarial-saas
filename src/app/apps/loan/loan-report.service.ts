import { Injectable } from "@angular/core";
import { LoanAmortizationSchedule, LoanSummaryMetric, LoanTableConfiguration } from "./loan.models";
import { isNil } from "lodash";
import { DateTime } from 'luxon';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
    providedIn: 'root',
})
export class LoanReportService {
    /**
     * Method used to take loan parameters, loan summary metrics, loan amortization table's column headings, and the loan amortization schedule iteself, and export the data into a CSV.
     */
    async exportToCSV(loanParameters: LoanSummaryMetric[], loanSummaryMetrics: LoanSummaryMetric[], loanTableConfiguration: LoanTableConfiguration[], loanAmortizationSchedule: LoanAmortizationSchedule[]): Promise<void> {
        for (const item of loanParameters) {
            if (isNil(item.value) || item.value === 0) {
                throw new Error("Loan Parameters must be provided to create the loan amortization schedule and export CSV!")
            }
        }

        const csvRows: string[] = [];

        const exportDate: string = DateTime.now().toLocaleString(DateTime.DATE_FULL);
        const exportTime: string = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);

        // 1. Add Report Title & Timestamp
        csvRows.push("Loan Summary Report");
        csvRows.push(`Export Date,${exportDate}`);
        csvRows.push(`Export Time,${exportTime}`);
        csvRows.push("");

        // 2. Add Loan Parameters
        csvRows.push("---LOAN PARAMETERS---");
        for (const item of loanParameters) {
            csvRows.push(`${item.label},${item.value}`)
        }
        csvRows.push("");

        // 3. Add Loan Summary Metrics
        csvRows.push("---LOAN SUMMARY METRICS---")
        for (const item of loanSummaryMetrics) {
            csvRows.push(`${item.label},${item.value}`)
        }
        csvRows.push("");

        // 4. Add additional blank spaces
        csvRows.push("");
        csvRows.push("");

        // 5. Add Column Headings of Loan Amortization Schedule
        const columnHeadings: string[] = loanTableConfiguration.map((item: LoanTableConfiguration) => item.heading);
        csvRows.push(`${columnHeadings.join(",")}`);

        // 6. Add Row Values to Loan Amortization Schedule
        for (const item of loanAmortizationSchedule) {
            csvRows.push(`${item.period},${item.time},${item.loanPayment.value},${item.interestPaid.value},${item.principalRepaid.value},${item.outstandingBalance.value}`);
        }

        // 7. Create filename of CSV
        const csvExportDatetime: string = DateTime.now().toISO();
        const filename: string = `LoanAmortizationSchedule-${csvExportDatetime}.csv`;

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
     * Method used to take loan parameters, loan summary metrics, loan amortization table's column headings, and the loan amortization schedule iteself, and generate the data into a PDF.
     */
    async generatePDF(loanParameters: LoanSummaryMetric[], loanTableConfiguration: LoanTableConfiguration[], loanAmortizationSchedule: LoanAmortizationSchedule[]): Promise<void> {
        for (const item of loanParameters) {
            if (isNil(item.value) || item.value === 0) {
                throw new Error("Loan Parameters must be provided to create the loan amortization schedule and generate PDF!")
            }
        }
        const doc: jsPDF = new jsPDF();
        // Loan Amortization Schedule's Column Headings
        const tableColumns: string[][] = [
            loanTableConfiguration.map((item: LoanTableConfiguration) => item.heading)
        ];
        // Loan Amortization Schedule's Data
        const tableData: (string | number)[][] = loanAmortizationSchedule.map((item: LoanAmortizationSchedule) => {
            const result: (string | number)[] = [
                item.period,
                item.time,
                item.loanPayment.displayValue,
                item.interestPaid.displayValue,
                item.principalRepaid.displayValue,
                item.outstandingBalance.displayValue
            ];
            return result;
        });
        // Place Loan Amortization Schedule Table in Report
        autoTable(doc, 
            {
                head: tableColumns,
                body: tableData,
                startY: 20, // Margin from the top
                theme: 'striped', // Available themes: 'striped', 'grid', 'plain'
                headStyles: { fillColor: [41, 128, 185] }, // Custom header color
                columnStyles: {
                    0: {halign: 'left'},
                    1: {halign: 'left'},
                    2: {halign: 'right'},
                    3: {halign: 'right'},
                    4: {halign: 'right'},
                    5: {halign: 'right'}
                },
            }
        );
        // Create filename
        const pdfGenerationDatetime: string = DateTime.now().toISO();
        const filename: string = `LoanAmortizationSchedule-${pdfGenerationDatetime}.pdf`;
        // Save PDF
        doc.save(filename);
    }
}