export interface BinomialParameters {
    n: number;
    p: number;
}

export interface DiscreteUniformParameters {
    a: number;
    b: number;
}

export interface GeometricParameters {
    version: string;
    n: number;
    p: number;
}

export interface PoissonParameters {
    n: number;
    lambda: number;
}

export interface NegativeBinomialParameters {
    type: string;
    n: number;
    r: number;
    p: number;
}

export interface DiscreteProbabilityMetric {
    metricType: 'probability' | 'value';
    label: string;
    value: number | undefined;
    displayValue: string;
}

export interface DiscreteProbabilityTableValue {
    value: number;
    displayValue: string;
}

export interface DiscreteProbabilityDistributionTable {
    index: number;
    x: number;
    pmf: DiscreteProbabilityTableValue;
    cdf: DiscreteProbabilityTableValue;
    sf: DiscreteProbabilityTableValue;
}

export interface DiscreteProbabilityTableConfiguration {
    name: string;
    heading: string;
    textPosition: string;
}