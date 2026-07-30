import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { discreteProbabilityResolver } from './discrete-probability-resolver';

describe('discreteProbabilityResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => discreteProbabilityResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
