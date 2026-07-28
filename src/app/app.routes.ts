import { Routes } from '@angular/router';
import { LoanResolver } from './apps/loan/loan.resolver';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./apps/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage)
    },
    {
        path: "loan",
        loadComponent: () => import('./apps/loan/loan-amortization-page/loan-amortization-page').then((m) => m.LoanAmortizationPage),
        resolve: {
            data: LoanResolver
        },
    },
    {
        path: "discrete-probability",
        loadComponent: () => import('./apps/discrete-probability/discrete-probability-page/discrete-probability-page').then((m) => m.DiscreteProbabilityPage)
    }
];
