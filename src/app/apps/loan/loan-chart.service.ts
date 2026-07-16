import { Injectable } from "@angular/core";
import { LoanAmortizationSchedule } from "./loan.models";
import { LineChartData } from "../../shared/models";

@Injectable({
    providedIn: 'root',
})
export class LoanChartService {

    /**
     * Method used to to create line chart data for an amortization curve using time t and outstanding balance based on the generated loan amortization schedule.
     * @param loanAmortizationSchedule 
     * @returns object containing x, y, and title
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
}