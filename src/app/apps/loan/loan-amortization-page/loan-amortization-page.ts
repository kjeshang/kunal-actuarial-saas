import { Component } from '@angular/core';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { LoanParameters } from '../loan-parameters/loan-parameters';

@Component({
  selector: 'app-loan-amortization-page',
  imports: [FeatureContainer, LoanParameters],
  templateUrl: './loan-amortization-page.html',
  styleUrl: './loan-amortization-page.css',
})
export class LoanAmortizationPage {}
