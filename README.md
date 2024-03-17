# Pay credit card
This project is created using **vite**, **ReactJs**, **Redux**, **Typescript**, **TailwindCSS**. Here's how to use the available scripts to get started:

[Project url deployed to AWS using Amplify](https://main.d1u117ql4a9s1t.amplifyapp.com/)


## Installation
To install dependencies, run:

```
npm run install
```

## Starting the React App
This command will start the React app in development mode.

```
npm run dev
```

## Build App
Builds the app for production to the **dist** folder.

```
npm run build
```

## Preview build
Previews your production build locally.

```
npm run preview
```

## Linting
Lints the project using **eslint**.

```
npm run lint
```

## Format code
Formats your code with **prettier**

```
npm run format
```

## Unit test
Launches the test runner in the interactive watch mode using **@testing-library**.

```
npm run test
```

For the payment process, a mock is used simulating the payment process, for this the following credit cards are used as valid, any other payment will be rejected

Type Card    | Card 1           | Card 1           | Card 3
-------------|------------------|------------------|-----------------
MAESTRO      | 5018000000000000 | 5038000000000000 | 6390000000000000
JCB          | 3528000000000000 | 3589000000000000 | 3529000000000000
VISA         | 4916338506082832 | 4024007198964305 | 4716175187624512
MASTERCARD   | 5280934283171080 | 5259474113320034 | 5442179619690834
DISCOVER     | 6011894492395579 | 6011388644154687 | 6011880085013612
AMEX         | 345936346788903  | 377669501013152  | 373083634595479
DINERS CLUB  | 36163383666975   | 36341776399657   | 36342079574889

## Test coverage

Reports test coverage.

```
npm run test:coverage
```

## Result coverage of unit test

File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                   
---------------|---------|----------|---------|---------|-------------------------------------
All files      |   95.94 |    96.05 |   86.44 |    95.7 |                                     
 Button        |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 CreditCard    |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 ErrorBoundary |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 ErrorMessage  |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Form          |     100 |      100 |     100 |     100 |                                     
  Input.tsx    |     100 |      100 |     100 |     100 |                                     
  Label.tsx    |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Home          |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Layout        |      96 |       75 |      75 |      96 |                                     
  index.tsx    |      96 |       75 |      75 |      96 | 29                                  
 Loading       |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 NavBar        |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Payment       |   89.88 |    89.47 |   66.66 |   88.88 |                                     
  index.tsx    |   80.43 |       50 |      50 |   80.43 | 102,110,114-120,129,133,137,141,145 
  services.ts  |     100 |      100 |     100 |     100 |                                     
 ProductCard   |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Products      |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Providers     |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Result        |   96.77 |      100 |    87.5 |   96.66 |                                     
  index.tsx    |   96.77 |      100 |    87.5 |   96.66 | 75                                  
 StepBar       |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     
 Summary       |     100 |      100 |     100 |     100 |                                     
  index.tsx    |     100 |      100 |     100 |     100 |                                     

- Test Suites: 18 passed, 18 total
- Tests:       53 passed, 53 total
- Snapshots:   0 total
- Time:        10.658 s
- Ran all test suites matching /.\/src/i.