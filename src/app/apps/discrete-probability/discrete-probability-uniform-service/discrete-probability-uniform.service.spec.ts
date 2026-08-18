import { TestBed } from '@angular/core/testing';

import { DiscreteProbabilityUniformService } from './discrete-probability-uniform.service';

describe('DiscreteProbabilityUniformService', () => {
  let service: DiscreteProbabilityUniformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteProbabilityUniformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
