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
```

## Loan app

### Loan Amortization Parameters
* Loan Amount ($)
* Annual Effective Interest Rate (%)
* Term of Loan (in years)
* Payment Frequency (per year): "Annual", "Semiannual", "Quarterly", "Monthly"
* Start Date of Loan <= Will add later
* Toggle between payment made at end of period and beginning of period (i.e., Annuity Immediate vs Annuity Due) <= Will figure out how to add later

### Output

Summary Metrics:
> m = Payment Frequency (per year) = m-thly period
* m-thly payment amount: "Annual Payment Amount", "Semiannual Payment Amount", "Quarterly Payment Amount", "Monthly Payment Amount"
* Total number of periods
* Total interest paid
* m-thly effective interest rate: "Annual Effective Interest Rate", "Semiannual Effective Interest Rate", "Quarterly Effective Interest Rate", "Monthly Effective Interest Rate"
* m-thly nominal interest rate: "Annual Nominal Interest Rate", "Semiannual Nominal Interest Rate", "Quarterly Nominal Interest Rate", "Monthly Nominal Interest Rate"
* m-thly effective rate of discount: "Annual Effective Rate of Discount", "Semiannual Effective Rate of Discount", "Quarterly Effective Rate of Discount", "Monthly Effective Rate of Discount"

Loan Amortization Table:
* _Time (in years)_ column
* _Payment Date_ column <= Will add later
* _Loan Payment_ column
* _Interest Paid at Time t_ column
* _Principal Paid at Time t_ column
* _Outstanding Balance at Time t_ column

Visualizations:
* Amortization Curve; Outstanding Balance over Time = Line Chart <= Done
* The Interest vs. Principal Breakdown (Stacked Area or Bar Chart) <= Done
* Total Cost of Borrowing (Donut / Pie Chart) <= Done
* The "Race to Equity" (Cumulative Principal vs. Cumulative Interest) <= Pending



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
