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
    async exportToCSV(loanParameters: LoanSummaryMetric[], loanSummaryMetrics: LoanSummaryMetric[], loanAmortizationScheduleColumnHeadings: string[], loanTableConfiguration: LoanTableConfiguration[], loanAmortizationSchedule: LoanAmortizationSchedule[]): Promise<void> {
        for (const item of loanParameters) {
            if (isNil(item.value) || item.value === 0) {
                throw new Error("Loan Parameters must be provided to create the loan amortization schedule and export CSV!")
            }
        }
        console.log(loanSummaryMetrics);
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
        // csvRows.push(`${loanAmortizationScheduleColumnHeadings.join(",")}`);
        const columnHeadings: string[] = loanTableConfiguration.map((item: LoanTableConfiguration) => item.heading);
        csvRows.push(`${columnHeadings.join(",")}`);

        // 6. Add Row Values to Loan Amortization Schedule
        // const columnNames: string[] = loanTableConfiguration.map((item: LoanTableConfiguration) => item.name);
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

    async generatePDF(): Promise<void> {
        // Testing out JSPDF and JSPDFAutoTable in Angular using practice data
        const doc = new jsPDF();

        const tableColumns = [['ID', 'Name', 'Email', 'Role']];
        const tableData = [
            [1, 'Alice Smith', 'alice@example.com', 'Admin'],
            [2, 'Bob Jones', 'bob@example.com', 'User'],
            [3, 'Charlie Brown', 'charlie@example.com', 'Moderator']
        ];

        autoTable(doc, {
            head: tableColumns,
            body: tableData,
            startY: 20, // Margin from the top
            theme: 'striped', // Available themes: 'striped', 'grid', 'plain'
            headStyles: { fillColor: [41, 128, 185] } // Custom header color
        });

        doc.save('angular-table-export.pdf');
    }
}