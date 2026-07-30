export interface BinomialParameters {
    n: number;
    p: number;
}

export interface DiscreteUniformParameters {
    a: number;
    b: number;
}

export interface GeometricParameters {
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