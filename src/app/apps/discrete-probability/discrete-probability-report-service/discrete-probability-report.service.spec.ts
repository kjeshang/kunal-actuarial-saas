import { TestBed } from '@angular/core/testing';

import { DiscreteProbabilityReportService } from './discrete-probability-report.service';

describe('DiscreteProbabilityReportService', () => {
  let service: DiscreteProbabilityReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteProbabilityReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
