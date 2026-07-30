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
            let parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined = undefined;
            switch (probabilityDistribution) {
                case "binomial":
                    parameters = { n: 0, p: 0 };
                    break;
                case "discrete-uniform":
                    parameters = { a: 0, b: 0 };
                    break;
                case "geometric":
                    parameters = { n: 0, p: 0 };
                    break;
                case "poisson":
                    parameters = { n: 0, lambda: 0 };
                    break;
                case "negative-binomial":
                    parameters = { type: '', n: 0, r: 0, p: 0 };
                    break;
                default:
                    parameters = undefined;
                    break;
            }
            patchState(store, (state: DiscreteProbabilityState) => ({
                probabilityDistribution: probabilityDistribution,
                parameters: parameters
            }));
        },
        async setParameters(parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): Promise<void> {
            patchState(store, (state: DiscreteProbabilityState) => ({
                parameters: parameters
            }));
        }
    }))
)