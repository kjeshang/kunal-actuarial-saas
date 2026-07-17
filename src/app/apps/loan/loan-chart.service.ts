import { Injectable } from "@angular/core";
import { LoanAmortizationSchedule } from "./loan.models";
import { LineChartData, PieChartData, StackedAreaChartData } from "../../shared/models";
import currency from "currency.js";

@Injectable({
    providedIn: 'root',
})
export class LoanChartService {

    /**
     * Method used to to create line chart data for an amortization curve using time t and outstanding balance based on the generated loan amortization schedule.
     * @param loanAmortizationSchedule 
     * @returns object containing x, y, title, xAxisTitle, and yAxisTitle
     */
    getAmortizationCurveData(loanAmortizationSchedule: LoanAmortizationSchedule[]): LineChartData {
        const chartData: LineChartData = {
            x: loanAmortizationSchedule.map((item: LoanAmortizationSchedule) => item.time),
            y: loanAmortizationSchedule.map((item: LoanAmortizationSchedule) => item.outstandingBalance.value),
            title: "Outstanding Balance over Time",
            mode: "lines+markers",
            xAxisTitle: "Time Period",
            yAxisTitle: "Outstanding Balance ($)"
        }
        return chartData;
    }

    /**
     * Method used to create stacked bar chart data to compare interest paid to principal repaid
     * @param loanAmortizationSchedule
     * @returns object containing x, y1, y2, title, xAxisTitle, yAxisTitle, y1Nae, and y2Name
     */
    getInterestVsPrincipalData(loanAmortizationSchedule: LoanAmortizationSchedule[]): StackedAreaChartData {
        const chartData: StackedAreaChartData = {
            x: loanAmortizationSchedule.map((item: LoanAmortizationSchedule) => item.time),
            y1: loanAmortizationSchedule.map((item: LoanAmortizationSchedule) => item.interestPaid.value),
            y2: loanAmortizationSchedule.map((item: LoanAmortizationSchedule) => item.principalRepaid.value),
            title: "Interest Paid vs Principal Repaid",
            mode: "markers",
            xAxisTitle: "Time Period",
            yAxisTitle: "Amount ($)",
            y1Name: "Interest Paid",
            y2Name: "Principal Repaid",
            y1Fill: "tozeroy",
            y2Fill: "tonexty",
        };
        return chartData;
    }

    /**
     * Method used to create pie/doughnut chart to determine cost of borrowing (i.e., compare interest paid against total principal paid).
     * @param loanAmortizationSchedule 
     * @returns labels, values, title, and hole
     */
    getCostOfBorrowingData(loanAmortizationSchedule: LoanAmortizationSchedule[]) {
        const totalPrincipalPaid: number = loanAmortizationSchedule.reduce((acc: number, val: LoanAmortizationSchedule) => {
            return currency(acc).add(val.principalRepaid.value).value;
        }, 0);

        const totalInterestPaid: number = loanAmortizationSchedule.reduce((acc: number, val: LoanAmortizationSchedule) => {
            return currency(acc).add(val.interestPaid.value).value;
        }, 0);
        
        const chartData: PieChartData = {
            labels: ["Total Principal Paid (i.e., Loan Amount)", "Total Interest Paid"],
            values: [totalPrincipalPaid, totalInterestPaid],
            title: "Total Cost of Borrowing",
            hole: 0.5
        };
        return chartData;
    }

    getRaceToEquityData(loanAmortizationSchedule: LoanAmortizationSchedule[]) {
        
    }
}