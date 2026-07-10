import { inject } from "@angular/core";
import { LoanStore } from "./loan.store";
import { of } from "rxjs";

export const LoanResolver = async () => {
    const loanStore = inject(LoanStore);
    await loanStore.setLoanAmount(0);
    await loanStore.setInterestRate(0);
    await loanStore.setTermOfLoan(0);
    await loanStore.setPaymentFrequency(1);
    return of(undefined);
}
