import { Injectable } from "@angular/core";
import { LoanAmortizationSchedule } from "./loan.models";
import { LineChartData, MultiLineChartData, PieChartData, StackedAreaChartData } from "../../shared/models";
import currency from "currency.js";

@Injectable({
    providedIn: 'root',
})
export class LoanChartService {

    /**
     * Method used to to create line chart data for an amortization curve using time t and outstanding balance based on the generated loan amortization schedule.
     * @param loanAmortizationSchedule 
     * @returns LineChartData object
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
     * @returns StackedAreaChartData object
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
     * @returns PieChartData object
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

    /**
     * Method used to create a multi-line chart to determine race to equity (i.e., compare cumulative interest paid against cumulative principal paid)
     * @param loanAmortizationSchedule 
     * @returns MultiLineChartData object
     */
    getRaceToEquityData(loanAmortizationSchedule: LoanAmortizationSchedule[]): MultiLineChartData {
        // let cumulativeInterestPaid: number[] = [];
        // let cumulativePrincipalPaid: number[] = [];
        // for (let i = 0; i <= loanAmortizationSchedule.length; i++) {
        //     const interestPaid: number = loanAmortizationSchedule.slice(0, i).reduce((acc, val) => {
        //         return currency(acc).add(val.interestPaid.value).value;
        //     }, 0);
        //     cumulativeInterestPaid.push(interestPaid);
        //     const principalPaid: number = loanAmortizationSchedule.slice(0, i).reduce((acc, val) => {
        //         return currency(acc).add(val.principalRepaid.value).value;
        //     }, 0);
        //     cumulativePrincipalPaid.push(principalPaid);
        // }
        // const chartData: MultiLineChartData = {
        //     x: loanAmortizationSchedule.map((item: LoanAmortizationSchedule) => item.time),
        //     y1: cumulativeInterestPaid,
        //     y2: cumulativePrincipalPaid,
        //     title: "Race to Equity",
        //     mode: "lines+markers",
        //     xAxisTitle: "Time Period",
        //     yAxisTitle: "Cumulative Amount ($)",
        //     y1Name: "Cumulative Interest Paid",
        //     y2Name: "Cumulative Principal Paid"
        // }
        // return chartData;
        
        let runningInterest: number = 0;
        let runningPrincipal: number = 0;
        let timePeriods: number[] = [];
        let cumulativeInterestPaid: number[] = [];
        let cumulativePrincipalPaid: number[] = [];
        loanAmortizationSchedule.forEach((row: LoanAmortizationSchedule) => {
            timePeriods.push(row.time);
            runningInterest = currency(runningInterest).add(row.interestPaid.value).value;
            cumulativeInterestPaid.push(runningInterest);
            runningPrincipal = currency(runningPrincipal).add(row.principalRepaid.value).value;
            cumulativePrincipalPaid.push(runningPrincipal);
        });
        const chartData: MultiLineChartData = {
            x: timePeriods,
            y1: cumulativeInterestPaid,
            y2: cumulativePrincipalPaid,
            title: "Race to Equity",
            mode: "lines+markers",
            xAxisTitle: "Time Period",
            yAxisTitle: "Cumulative Amount ($)",
            y1Name: "Cumulative Interest Paid",
            y2Name: "Cumulative Principal Paid"
        }
        return chartData;
    }
}