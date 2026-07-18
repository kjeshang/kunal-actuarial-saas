import { Injectable } from "@angular/core";
import { LoanAmortizationSchedule, LoanSummaryMetric } from "./loan.models";
import { isNil } from "lodash";
import { DateTime } from 'luxon';

@Injectable({
    providedIn: 'root',
})
export class LoanReportService {

    async exportToCSV(loanParameters: { label: string, value: number }[], loanSummaryMetrics: LoanSummaryMetric[], loanAmortizationScheduleColumnHeadings: string[], loanAmortizationSchedule: LoanAmortizationSchedule[]): Promise<void> {
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
        csvRows.push(`${loanAmortizationScheduleColumnHeadings.join(",")}`);
        for(const item of loanAmortizationSchedule) {
            csvRows.push(`${item.time},${item.loanPayment.value},${item.interestPaid.value},${item.principalRepaid.value},${item.outstandingBalance.value}`);
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
}