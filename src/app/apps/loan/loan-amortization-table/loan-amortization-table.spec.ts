import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizationTable } from './loan-amortization-table';

describe('LoanAmortizationTable', () => {
  let component: LoanAmortizationTable;
  let fixture: ComponentFixture<LoanAmortizationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanAmortizationTable],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanAmortizationTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
