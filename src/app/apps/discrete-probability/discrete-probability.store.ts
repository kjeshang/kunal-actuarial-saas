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
    withMethods((store) => ({
        /**
         * Method used to set probability distribution.
         * @param probabilityDistribution Name of probability distribution
         */
        async setProbabilityDistribution(probabilityDistribution: string): Promise<void> {
            patchState(store, (state: DiscreteProbabilityState) => ({
                probabilityDistribution: probabilityDistribution
            }));
            // let parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined = undefined;
            // switch(store.probabilityDistribution()) {
            //     case "binomial":
            //         parameters = {n: 0, p: 0} as BinomialParameters;
            // }
        }
    }))
)