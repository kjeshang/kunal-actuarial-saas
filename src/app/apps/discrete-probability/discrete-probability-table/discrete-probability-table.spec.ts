import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteProbabilityTable } from './discrete-probability-table';

describe('DiscreteProbabilityTable', () => {
  let component: DiscreteProbabilityTable;
  let fixture: ComponentFixture<DiscreteProbabilityTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteProbabilityTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscreteProbabilityTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
