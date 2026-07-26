export enum AppCategory {
    FinancialMath = "Financial Mathematics & Cash Flows",
    RiskAndLoss = "Probability & Risk Modeling",
    LifeContingencies = "Life Contingencies & Mortality Models",
    // RatemakingReserve = 'Short-Term Ratemaking & Reserving',
    // PredictiveStats = 'Predictive Analytics & Credibility',
    // FinancialEcon = 'Financial Economics & Risk'
}

export interface App {
    id: string;
    title: string;
    description: string;
    route: string;
    category: AppCategory
}