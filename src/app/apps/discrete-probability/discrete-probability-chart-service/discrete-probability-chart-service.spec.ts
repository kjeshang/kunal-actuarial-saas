import { TestBed } from '@angular/core/testing';

import { DiscreteProbabilityChartService } from './discrete-probability-chart-service';

describe('DiscreteProbabilityChartService', () => {
  let service: DiscreteProbabilityChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteProbabilityChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
