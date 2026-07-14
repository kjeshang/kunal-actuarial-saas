import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyFormat } from '../../../shared/currency-format/currency-format';
import { CommonModule } from '@angular/common';
import { InterestRateFormat } from '../../../shared/interest-rate-format/interest-rate-format';
import { LoanStore } from '../loan.store';
import { isNil } from 'lodash';

@Component({
  selector: 'app-loan-parameters',
  imports: [MatExpansionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, CurrencyFormat, InterestRateFormat],
  templateUrl: './loan-parameters.html',
  styleUrl: './loan-parameters.css',
})
export class LoanParameters {
  private fb: FormBuilder = inject(FormBuilder);
  loanStore = inject(LoanStore);

  loanParametersForm: FormGroup = this.fb.group({
    // Loan Amount
    // Alternate Regex Pattern = /^\$?(?:\d+|\d{1,3}(?:,\d{3})*)?(\.\d{0,2})?$/
    loanAmount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    // Annual Effective Interest Rate
    interestRate: ['', [Validators.required, Validators.min(1)]],
    // Term of Loan (in years)
    termOfLoan: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
    // Payment Frequency (per year)
    paymentFrequency: ['', Validators.required]
  });

  /**
   * Save loan amount to save in signal store. 
   */
  saveLoanAmount(): void {
    // Loan Amount
    const loanAmount: string = this.loanParametersForm.get("loanAmount")?.value;
    const parsedLoanAmount: number = typeof loanAmount === 'number' ? loanAmount : parseFloat(loanAmount);
    if (!isNil(parsedLoanAmount) && parsedLoanAmount > 0) {
      this.loanStore.setLoanAmount(parsedLoanAmount);
    }
  }

  /**
   * Save interest rate in signal store.
   */
  saveInterestRateInput(): void {
    // Annual Effective Interest Rate
    const interestRate: string = this.loanParametersForm.get("interestRate")?.value;
    const parsedInterestRate: number = typeof interestRate === 'number' ? interestRate : parseFloat(interestRate);
    if (!isNil(parsedInterestRate) && parsedInterestRate > 0) {
      const roundedInterestRate: number = Math.round((parsedInterestRate + Number.EPSILON) * 10000) / 10000;
      this.loanStore.setInterestRate(roundedInterestRate / 100);
    }
  }

  /**
   * Save term of loan in signal store.
   */
  saveTermOfLoan(): void {
    // Term of Loan (in years)
    const termOfLoan: string = this.loanParametersForm.get("termOfLoan")?.value;
    const parsedTermOfLoan: number = typeof termOfLoan === 'number' ? termOfLoan : parseFloat(termOfLoan);
    if (!isNil(parsedTermOfLoan) && Number.isInteger(parsedTermOfLoan) && parsedTermOfLoan > 0 && parsedTermOfLoan % 1 === 0) {
      this.loanStore.setTermOfLoan(parsedTermOfLoan);
    }
  }

  /**
   * Save payment frequency in signal store.
   */
  savePaymentFrequency(): void {
    // Payment Frequency (per year)
    const paymentFrequency: string = this.loanParametersForm.get("paymentFrequency")?.value;
    const parsedPaymentFrequency: number = typeof paymentFrequency === 'number' ? paymentFrequency : parseInt(paymentFrequency);
    if (!isNil(parsedPaymentFrequency)) {
      this.loanStore.setPaymentFrequency(parsedPaymentFrequency);
    }
  }
}
