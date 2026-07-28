import { AppCategory, SaaSApp } from "../shared/models";

export const saasApps: SaaSApp[] = [
    {
      id: `${AppCategory.FinancialMath}-1`,
      title: "Loan Amortization",
      icon: "account_balance",
      description: "A client-side actuarial engine for modeling precise fixed-rate loan amortization schedules under both Annuity Immediate and Annuity Due payment structures, complete with real-time visual analytics and instant PDF/CSV report exports.",
      route: "/loan",
      category: AppCategory.FinancialMath
    }
  ];