import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanParameters } from './loan-parameters';

describe('LoanParameters', () => {
  let component: LoanParameters;
  let fixture: ComponentFixture<LoanParameters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanParameters],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanParameters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
