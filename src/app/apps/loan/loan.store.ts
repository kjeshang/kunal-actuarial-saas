import { computed, inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { LoanService } from "./loan.service";
import { LoanChartService } from "./loan-chart.service";

type LoanState = {
    loanAmount: number;
    interestRate: number;
    termOfLoan: number;
    paymentFrequency: number;
}

const initialLoanState: LoanState = {
    loanAmount: 0,
    interestRate: 0,
    termOfLoan: 0,
    paymentFrequency: 0
}

export const LoanStore = signalStore(
    { providedIn: 'root' },
    withState(initialLoanState),
    withMethods((store) => ({
        /**
         * Method used to set loan amount.
         * @param loanAmount Numerical amount of loan
         */
        async setLoanAmount(loanAmount: number): Promise<void> {
            patchState(store, (state: LoanState) => ({
                loanAmount: loanAmount
            }));
        },
        /**
         * Method used to set interest rate.
         * @param interestRate Annual effective interest rate
         */
        async setInterestRate(interestRate: number): Promise<void> {
            patchState(store, (state: LoanState) => ({
                interestRate: interestRate
            }));
        },
        /**
         * Method used to set term of loan.
         * @param termOfLoan Lifetime of loan in years
         */
        async setTermOfLoan(termOfLoan: number): Promise<void> {
            patchState(store, (state: LoanState) => ({
                termOfLoan: termOfLoan
            }));
        },
        /**
         * Method used to set payment frequency.
         * @param paymentFrequency Periodicity of loan payments.
         */
        async setPaymentFrequency(paymentFrequency: number): Promise<void> {
            patchState(store, (state: LoanState) => ({
                paymentFrequency: paymentFrequency
            }));
        }
    })),
    withComputed((
        {
            loanAmount,
            interestRate,
            termOfLoan,
            paymentFrequency,
        },
        loanService: LoanService = inject(LoanService),
        loanChartService: LoanChartService = inject(LoanChartService)
    ) => ({
        periodicEffectiveInterestRate: computed(() => {
            return loanService.calculatePeriodicEffectiveInterestRate(interestRate(), paymentFrequency());
        }),
        periodicPaymentAmount: computed(() => {
            return loanService.calculatePeriodicPaymentAmount(loanAmount(), interestRate(), termOfLoan(), paymentFrequency());
        }),
        periodicNominalInterestRate: computed(() => {
            return loanService.calculatePeriodicNominalInterestRate(interestRate(), paymentFrequency());
        }),
        periodicRateOfDiscount: computed(() => {
            return loanService.calculatePeriodicEffectiveDiscountRate(interestRate(), paymentFrequency());
        }),
        loanAmortizationSchedule: computed(() => {
            return loanService.createLoanAmortizationSchedule(loanAmount(), interestRate(), termOfLoan(), paymentFrequency());
        }),
        amortizationCurveChart: computed(() => {
            const loanAmortizationSchedule = loanService.createLoanAmortizationSchedule(loanAmount(), interestRate(), termOfLoan(), paymentFrequency());
            return loanChartService.getAmortizationCurveData(loanAmortizationSchedule);
        }),
        interestVsPrincipalChart: computed(() => {
            const loanAmortizationSchedule = loanService.createLoanAmortizationSchedule(loanAmount(), interestRate(), termOfLoan(), paymentFrequency());
            return loanChartService.getInterestVsPrincipalData(loanAmortizationSchedule);
        }),
        costOfBorrowingChart: computed(() => {
            const loanAmortizationSchedule = loanService.createLoanAmortizationSchedule(loanAmount(), interestRate(), termOfLoan(), paymentFrequency());
            return loanChartService.getCostOfBorrowingData(loanAmortizationSchedule);
        })
    }))
)