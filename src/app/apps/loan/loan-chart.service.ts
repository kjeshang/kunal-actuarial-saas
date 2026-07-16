import { Injectable } from "@angular/core";
import { LoanAmortizationSchedule } from "./loan.models";
import { LineChartData, StackedAreaChartData } from "../../shared/models";

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
            xAxisTitle: "Time Period",
            yAxisTitle: "Amount ($)",
            y1Name: "Interest Paid",
            y2Name: "Principal Repaid",
        };
        return chartData;
    }
}