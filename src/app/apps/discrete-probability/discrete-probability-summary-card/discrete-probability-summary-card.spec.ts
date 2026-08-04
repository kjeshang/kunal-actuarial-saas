import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteProbabilitySummaryCard } from './discrete-probability-summary-card';

describe('DiscreteProbabilitySummaryCard', () => {
  let component: DiscreteProbabilitySummaryCard;
  let fixture: ComponentFixture<DiscreteProbabilitySummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteProbabilitySummaryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscreteProbabilitySummaryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
