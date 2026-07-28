import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteProbabilityParameters } from './discrete-probability-parameters';

describe('DiscreteProbabilityParameters', () => {
  let component: DiscreteProbabilityParameters;
  let fixture: ComponentFixture<DiscreteProbabilityParameters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteProbabilityParameters],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscreteProbabilityParameters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
