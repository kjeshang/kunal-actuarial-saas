import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizationPage } from './loan-amortization-page';

describe('LoanAmortizationPage', () => {
  let component: LoanAmortizationPage;
  let fixture: ComponentFixture<LoanAmortizationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanAmortizationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanAmortizationPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
