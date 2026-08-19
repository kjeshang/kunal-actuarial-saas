import { computed, inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { BinomialParameters, DiscreteUniformParameters, GeometricParameters, PoissonParameters, NegativeBinomialParameters, DiscreteProbabilityMetric, DiscreteProbabilityDistributionTable } from "./discrete-probability.models";
import { DiscreteProbabilityBinomialService } from "./discrete-probability-binomial-service/discrete-probability-binomial.service";
import { LineChartData, MultiLineChartData } from "../../shared/models";
import { DiscreteProbabilityChartService } from "./discrete-probability-chart-service/discrete-probability-chart-service";
import { DiscreteProbabilityUniformService } from "./discrete-probability-uniform-service/discrete-probability-uniform.service";
import { DiscreteProbabilityGeometricService } from "./discrete-probability-geometric-service/discrete-probability-geometric-service";

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
        binomialService: DiscreteProbabilityBinomialService = inject(DiscreteProbabilityBinomialService),
        uniformService: DiscreteProbabilityUniformService = inject(DiscreteProbabilityUniformService),
        geometricService: DiscreteProbabilityGeometricService = inject(DiscreteProbabilityGeometricService),
        chartService: DiscreteProbabilityChartService = inject(DiscreteProbabilityChartService)
    ) => ({
        discreteProbabilityDistributionParameters: computed(() => {
            let formattedParameters: DiscreteProbabilityMetric[] | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    formattedParameters = binomialService.formatBinomialParameters(probabilityDistribution(), parameters());
                    break;
                case "discrete-uniform":
                    formattedParameters = uniformService.formatDiscreteUniformParameters(probabilityDistribution(), parameters());
                    break;
                case "geometric":
                    formattedParameters = geometricService.formatGeometricParameters(probabilityDistribution(), parameters());
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
                case "discrete-uniform":
                    expectedValue = uniformService.calculateUniformExpectedValue(probabilityDistribution(), parameters());
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
                case "discrete-uniform":
                    secondMoment = uniformService.calculateUniformSecondMoment(probabilityDistribution(), parameters());
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
                case "discrete-uniform":
                    variance = uniformService.calculateDiscreteUniformVariance(probabilityDistribution(), parameters());
                    break;
                default:
                    variance = undefined;
                    break;
            }
            return variance;
        }),
        discreteProbabilityStandardDeviation: computed(() => {
            let standardDeviation: DiscreteProbabilityMetric | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    standardDeviation = binomialService.calculateBinomialStandardDeviation(probabilityDistribution(), parameters());
                    break;
                case "discrete-uniform":
                    standardDeviation = uniformService.calculateUniformStandardDeviation(probabilityDistribution(), parameters());
                    break;
                default:
                    standardDeviation = undefined;
                    break;
            }
            return standardDeviation;
        }),
        discreteProbabilityDistributionTable: computed(() => {
            let probabilityDistributionTable: DiscreteProbabilityDistributionTable[] = [];
            switch (probabilityDistribution()) {
                case "binomial":
                    probabilityDistributionTable = binomialService.createBinomialDistributionTable(probabilityDistribution(), parameters());
                    break;
                case "discrete-uniform":
                    probabilityDistributionTable = uniformService.createUniformDistributionTable(probabilityDistribution(), parameters());
                    break;
                default:
                    probabilityDistributionTable = [];
                    break;
            }
            return probabilityDistributionTable;
        }),
        pmfChart: computed(() => {
            let probabilityDistributionTable: DiscreteProbabilityDistributionTable[] = [];
            let chartData: LineChartData | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    probabilityDistributionTable = binomialService.createBinomialDistributionTable(probabilityDistribution(), parameters());
                    chartData = chartService.getPmfChartData(probabilityDistributionTable);
                    break;
                case "discrete-uniform":
                    probabilityDistributionTable = uniformService.createUniformDistributionTable(probabilityDistribution(), parameters());
                    chartData = chartService.getPmfChartData(probabilityDistributionTable);
                    break;
                default:
                    chartData = undefined;
                    break;
            }
            return chartData;
        }),
        cdfVsSfChart: computed(() => {
            let probabilityDistributionTable: DiscreteProbabilityDistributionTable[] = [];
            let chartData: MultiLineChartData | undefined = undefined;
            switch (probabilityDistribution()) {
                case "binomial":
                    probabilityDistributionTable = binomialService.createBinomialDistributionTable(probabilityDistribution(), parameters());
                    chartData = chartService.getCdfVsSfChartData(probabilityDistributionTable);
                    break;
                case "discrete-uniform":
                    probabilityDistributionTable = uniformService.createUniformDistributionTable(probabilityDistribution(), parameters());
                    chartData = chartService.getCdfVsSfChartData(probabilityDistributionTable);
                    break;
                default:
                    chartData = undefined;
                    break;
            }
            return chartData;
        })
    }))
)