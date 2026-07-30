import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DiscreteProbabilityStore } from '../discrete-probability.store';

export const DiscreteProbabilityResolver: ResolveFn<boolean> = (route, state) => {
  const discreteProbabilityStore = inject(DiscreteProbabilityStore);
  discreteProbabilityStore.setProbabilityDistribution("binomial");
  return true;
};
