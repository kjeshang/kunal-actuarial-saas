import { TestBed } from '@angular/core/testing';

import { DiscreteProbabilityGeometricService } from './discrete-probability-geometric-service';

describe('DiscreteProbabilityGeometricService', () => {
  let service: DiscreteProbabilityGeometricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteProbabilityGeometricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
