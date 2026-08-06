import { TestBed } from '@angular/core/testing';

import { DiscreteProbabilityCalculationService } from './discrete-probability-calculation.service';

describe('DiscreteProbabilityCalculationService', () => {
  let service: DiscreteProbabilityCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteProbabilityCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
