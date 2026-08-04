import { computed, inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { BinomialParameters, DiscreteUniformParameters, GeometricParameters, PoissonParameters, NegativeBinomialParameters, DiscreteProbabilityMetric } from "./discrete-probability.models";
import { DiscreteProbabilityBinomialService } from "./discrete-probability-binomial-service/discrete-probability-binomial.service";

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
        /**
         * Method used to set the parameters of the respective probability distribution.
         * @param parameters Unique parameters of the respective probability distribution
         */
        async setParameters(parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined): Promise<void> {
            patchState(store, (state: DiscreteProbabilityState) => ({
                parameters: parameters
            }));
        }
    })),
    withComputed((
        {
            probabilityDistribution,
            parameters
        },
        binomialService: DiscreteProbabilityBinomialService = inject(DiscreteProbabilityBinomialService)
    ) => ({
        discreteDistributionParameters: computed(() => {
            let formattedParameters: DiscreteProbabilityMetric[] | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    formattedParameters = binomialService.formatBinomialParameters(probabilityDistribution(), parameters());
                    break;
                default:
                    formattedParameters = undefined;
                    break;
            }
            return formattedParameters;
        }),
        discreteProbabilityExpectedValue: computed(() => {
            let expectedValue: DiscreteProbabilityMetric | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    expectedValue = binomialService.calculateBinomialExpectedValue(probabilityDistribution(), parameters());
                    break;
                default:
                    expectedValue = undefined;
                    break;
            }
            return expectedValue;
        }),
        discreteProbabilitySecondMoment: computed(() => {
            let secondMoment: DiscreteProbabilityMetric | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    secondMoment = binomialService.calculateBinomialSecondMoment(probabilityDistribution(), parameters());
                    break;
                default:
                    secondMoment = undefined;
                    break;
            }
            return secondMoment;
        }),
        discreteProbabilityVariance: computed(() => {
            let variance: DiscreteProbabilityMetric | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    variance = binomialService.calculateBinomialVariance(probabilityDistribution(), parameters());
                    break;
                default:
                    variance = undefined;
                    break;
            }
            return variance;
        })
    }))
)