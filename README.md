# EngangeSphere

Sample project with a Node.js backend and a React frontend.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngangeSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v20.11.1` while writing this doc)
- npm (I've used version `10.5.2` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Tests

Read the following [doc](./docs/TestCases.md) to get a list of the possible test cases that could be written for this app.

How to run the tests:

First install all the dependencies by running:
npm install

- Via terminal:
  npx cypress run
  npx cypress run --headed

- Via package script:
  npm run test:run
  npm run test:headless

- Via Cypress runner:
  npx cypress open

---

EngangeSphere Made with ❤️ by [Walmyr](https://walmyr.dev).
Tests created by Alekson!
