import { computed, inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { BinomialParameters, DiscreteUniformParameters, GeometricParameters, PoissonParameters, NegativeBinomialParameters } from "./discrete-probability.models";

type DiscreteProbabilityState = {
    probabilityDistribution: string;
    parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined;
}

const initialDiscreteProbabilityState: DiscreteProbabilityState = {
    probabilityDistribution: "",
    parameters: undefined
}

export const DiscreteProbabilityStore = signalStore(
    { providedIn: 'root' },
    withState(initialDiscreteProbabilityState),
)