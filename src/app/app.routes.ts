import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        loadComponent: () => import('./apps/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage)
    },
    {
        path:"loan",
        loadComponent: () => import('./apps/loan/loan-amortization-page/loan-amortization-page').then((m) => m.LoanAmortizationPage)
    }
];
