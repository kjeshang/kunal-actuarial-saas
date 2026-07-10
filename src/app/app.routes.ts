import { Routes } from '@angular/router';
import { LoanResolver } from './apps/loan/loan.resolver';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./apps/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
        resolve: {
            data: LoanResolver
        },
    },
    {
        path: "loan",
        loadComponent: () => import('./apps/loan/loan-amortization-page/loan-amortization-page').then((m) => m.LoanAmortizationPage)
    }
];
