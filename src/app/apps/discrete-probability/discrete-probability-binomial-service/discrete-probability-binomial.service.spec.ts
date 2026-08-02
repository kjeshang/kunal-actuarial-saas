import { TestBed } from '@angular/core/testing';

import { DiscreteProbabilityBinomialService } from './discrete-probability-binomial.service';

describe('DiscreteProbabilityBinomialService', () => {
  let service: DiscreteProbabilityBinomialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteProbabilityBinomialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
