import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-loan-parameters',
  imports: [MatExpansionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, CurrencyFormat, InterestRateFormat, CommonModule],
  templateUrl: './loan-parameters.html',
  styleUrl: './loan-parameters.css',
})
export class LoanParameters {
  private fb: FormBuilder = inject(FormBuilder);

  loanParametersForm: FormGroup = this.fb.group({
    // Loan Amount
    // Alternate Regex Pattern = /^\$?(?:\d+|\d{1,3}(?:,\d{3})*)?(\.\d{0,2})?$/
    loanAmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    // Annual Effective Interest Rate
    interestRate: ['', Validators.required],
    // Term of Loan (in years)
    termOfLoan: ['', Validators.required],
    // Payment Frequency (per year)
    paymentFrequency: ['', Validators.required]
  });

  formatLoanParameterInputs(): void {
    // Annual Effective Interest Rate
    // const interestRate = this.loanParametersForm.get("interestRate")?.value;
    // this.loanParametersForm.patchValue({interestRate: parseFloat(interestRate).toFixed(4)});
  }
}
