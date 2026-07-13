import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSummaryCard } from './loan-summary-card';

describe('LoanSummaryCard', () => {
  let component: LoanSummaryCard;
  let fixture: ComponentFixture<LoanSummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanSummaryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanSummaryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
