# mlem-dashboard

## Install & Start

⚠️  Using  [Yarn Package Manager](https://yarnpkg.com/)  is recommended over  `npm`.

Start your app in development environment

    yarn dev

Start your app in production environment

    yarn start

## Features

- **Next.js**  - Minimalistic framework for server-rendered React applications.
- **Typescript**  - Superset of JavaScript which primarily provides optional static typing, classes and interfaces.
- **ReduxToolKit** - Includes utilities to simplify common use cases like store setup, creating reducers, immutable update logic, and more.
- **Redux**  - A predictable state container for JavaScript apps.
- **Built-in Component CLI**- Create components with one command by using built-in cli or can custom it.
- **Docker**  - A tool designed to make it easier to create, deploy, and run applications by using containers.
- **ESLint**  - The pluggable linting utility.
- **Jest**  - Javascript testing framework , created by developers who created React.
- **Storybook**  - An open source tool for developing UI components in isolation for React.

## Folder

1. `constants`: Contains contants variable example: `const NAME = 'Liam';` (Should use upper snake case)
2. `hooks`: Custom react hooks
3. `layouts`: Component that you create to provide common elements across all of your pages.
4. `components`: Common component to re-use and split the UI into independent, reusable pieces, and think about each piece in isolation
5. `modules`: Modules wrap component for main feature (Import `components`).
6. `pages`: Pages are associated with a route based on their file name (Import `modules`).
7. `store`: Define redux with namming by resource/model to handle with redux
8. `typings`: Common typings for typescript
9.  `services`: Service provides multiple functions to retrieve data from or post data to an external service using the HTTP protocol.
10. `utils`: Utility function to re-use logic

## Code convention
1. `Component` should be PascalCase for filename

