import { TestBed } from '@angular/core/testing';

import { DiscreteProbabilityPoissonService } from './discrete-probability-poisson.service';

describe('DiscreteProbabilityPoissonService', () => {
  let service: DiscreteProbabilityPoissonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteProbabilityPoissonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
