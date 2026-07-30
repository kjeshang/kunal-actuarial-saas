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
            let parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined = undefined;
            switch(store.probabilityDistribution()) {
                case "binomial":
                    parameters = {n: 0, p: 0} as BinomialParameters;
                    break;
                case "discrete-uniform":
                    parameters = {a: 0, b: 0} as DiscreteUniformParameters;
                    break;
                case "geometric":
                    parameters = {n: 0, p: 0} as GeometricParameters;
                    break;
                case "poisson":
                    parameters = {n: 0, lambda: 0} as PoissonParameters;
                    break;
                case "negative-binomial":
                    parameters = {type: 'standard', n: 0, r: 0, p: 0} as NegativeBinomialParameters;
                    break;
                default:
                    parameters = undefined;
                    break;
            }
            patchState(store, (state: DiscreteProbabilityState) => ({
                parameters: parameters
            }));
        }
    }))
)