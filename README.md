# KunalActuarialSaas

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

## Premise

The purpose of this project is to create a server-less Actuarial Science Software-as-a-Service (SaaS).

## Package Installations

```
ng add @angular/material
ng add @ngrx/signals@latest
npm install lodash
npm install @types/lodash --save-dev
npm install luxon
npm install --save-dev @types/luxon
npm install currency.js
npm install angular-plotly.js plotly.js-dist-min --save
npm install @types/plotly.js-dist-min --save-dev
npm install jspdf jspdf-autotable
```

## Applications
> **Note** - Subject to changes

### Financial Mathematics & Cash Flows
|App Name|Description|Status|
|--|--|--|
|Loan Amortization|A client-side actuarial engine for modeling precise fixed-rate loan amortization schedules under both Annuity Immediate and Annuity Due payment structures, complete with real-time visual analytics and instant PDF/CSV report exports.|Built|

### Probability & Risk Modeling

|App Name|Description|Status|
|--|--|--|
|Discrete Probability||Pending|

## Loan Amortization app

### Loan Amortization Parameters
* Loan Amount ($)
* Annual Effective Interest Rate (%)
* Term of Loan (in years)
* Payment Frequency (per year): "Annual", "Semiannual", "Quarterly", "Monthly"
* Toggle between payment made at end of period and beginning of period (i.e., Annuity Immediate vs Annuity Due)
* Start Date of Loan <= Might add later

### Output

Summary Metrics:
> m = Payment Frequency (per year) = m-thly period
* m-thly payment amount: "Annual Payment Amount", "Semiannual Payment Amount", "Quarterly Payment Amount", "Monthly Payment Amount"
* Total interest paid
* Total number of periods
* m-thly effective interest rate: "Annual Effective Interest Rate", "Semiannual Effective Interest Rate", "Quarterly Effective Interest Rate", "Monthly Effective Interest Rate"
* m-thly nominal interest rate: "Annual Nominal Interest Rate", "Semiannual Nominal Interest Rate", "Quarterly Nominal Interest Rate", "Monthly Nominal Interest Rate"
* m-thly effective rate of discount: "Annual Effective Rate of Discount", "Semiannual Effective Rate of Discount", "Quarterly Effective Rate of Discount", "Monthly Effective Rate of Discount"

Visualizations:
* Amortization Curve; Outstanding Balance over Time = Line Chart
* The Interest vs. Principal Breakdown (Stacked Area or Bar Chart)
* Total Cost of Borrowing (Donut / Pie Chart)
* The "Race to Equity" (Cumulative Principal vs. Cumulative Interest)

Loan Amortization Table:
* _Period_ column
* _Time (in years)_ column
* _Payment Date_ column <= Will add later
* _Loan Payment_ column
* _Interest Paid at Time t_ column
* _Principal Paid at Time t_ column
* _Outstanding Balance at Time t_ column

> _Export to CSV_

> _Generate PDF Report_

> _Export to Excel Spreadsheet_ <= Maybe will add later

## Discrete Probability app

### Discrete Probability Distribution Parameters
* Binomial Distribution: Number of Trials (n), Probability of Success (p)
* Discrete Uniform Distribution: Minimum Value (a), Maximum Value (b)

### Outpu

Summary Metrics:
* Expected Value
* Second Moment
* Variance
* Standard Deviation
* Skewness <- Might add later
* Kurtosis <- Might add later
* VaR <- Might add later
* TVaR <- Might add later

### Rough Ideas
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CONSOLIDATED ACTUARIAL PLATFORM                       │
└─────────────────────────────────────────────────────────────────────────────┘

 1. 🏦 FINANCIAL MATHEMATICS & CASH FLOWS
    ├── 1. Loan Amortization & Cash Flow Engine (Built)
    ├── 2. Fixed Income & Bond Valuation Tool
    ├── 3. Asset-Liability Matching & Immunization Visualizer
    └── 4. Deterministic Capital Budgeting (NPV / IRR)

 2. 🛡️ LIFE CONTINGENCIES & MORTALITY MODELS
    ├── 5. Select & Ultimate Mortality Table Visualizer
    ├── 6. Life Insurance Actuarial Present Value (APV) Engine
    ├── 7. Life Annuity & Premium Calculator
    └── 8. Policy Reserving Tool (Net & Gross Premium)

 3. 📊 PROBABILITY & RISK MODELING
    ├── 9. Continuous Probability Distributions Visualizer
    ├── 10. Discrete Distributions & Claim Frequency Model
    ├── 11. Aggregate Loss & Panjer Recursion Engine
    └── 12. Risk Measure & Extreme Value Calculator (VaR / TVaR)

 4. 📉 SHORT-TERM RATEMAKING & RESERVING
    ├── 13. Loss Development Triangles & Reserving Tool
    ├── 14. Pure Premium & Indicated Rate Engine
    └── 15. Increased Limit Factors (ILF) & Deductible Analyzer

 5. 🔬 PREDICTIVE ANALYTICS & CREDIBILITY
    ├── 16. Credibility Theory Calculator (Bühlmann / Bühlmann-Straub)
    ├── 17. Insurance GLM & Rating Curve Visualizer
    └── 18. Time Series & Loss Forecasting Sandbox

 6. 💼 FINANCIAL ECONOMICS & ENTERPRISE RISK
    ├── 19. Black-Scholes Option Pricing & Greeks Engine
    └── 20. Binomial Option Pricing Tree Builder
```

## POTENTIAL TO-DOS

Create spec.ts files for the following files to eventually write custom unit tests.
* Create spec.ts file for `loan-chart.service.ts`. <= Recommended
* Create spec.ts file for `loan-report.service.ts`. <= Recommended
* Create spec.ts file for `loan.resolver.ts`.
* Create spec.ts file for `loan.service.ts`. <= Recommended
* Create spec.ts file for `loan.store.ts`. <= Recommended
* Create spec.ts file for `currency-format.ts`.
* Create spec.ts file for `interest-rate-format.ts`.
* Create a child component to display unique probability distribution's parameter form controls.
* Create a form service to create unique probability distribution's form controls.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
