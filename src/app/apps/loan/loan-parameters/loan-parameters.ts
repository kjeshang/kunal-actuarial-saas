import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-loan-parameters',
  imports: [MatExpansionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './loan-parameters.html',
  styleUrl: './loan-parameters.css',
})
export class LoanParameters {
  private fb: FormBuilder = inject(FormBuilder);

  loanParametersForm: FormGroup = this.fb.group({
    // Loan Amount
    loanAmount: ['', Validators.required],
    // Annual Effective Interest Rate
    interestRate: ['', Validators.required],
    // Term of Loan (in years)
    termOfLoan: ['', Validators.required],
    // Payment Frequency (per year)
    paymentFrequency: ['', Validators.required]
  });
}
