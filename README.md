# EngageSphere

Sample project with a Node.js backend and a React frontend.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngageSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v20.11.1` while writing this doc)
- npm (I've used version `10.5.2` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Tests

This project uses the Cypress front-end testing framework for test automation.

### Installation

Before running the tests, make sure you have installed the necessary dependencies.

Follow these steps:

1. Clone this repository to your local machine:
   ```sh
   git clone git@github.com:RalfCarneiro/EngageSphere-Test-Design-Masterclass-TAT.gitThis will execute the tests in headless mode and display the results in the terminal.

2. Navigate to the project directory:
    cd EngageSphere-Test-Design-Masterclass-TAT

3.Install the necessary devDependencies by running the command:
    npm install

Running Tests
Headed Mode (With GUI)
To run the tests in headed mode, follow these steps:

    1. Open the Cypress Test Runner by executing the below command:
        npx cypress open
    2. Select the test file you want to execute in the Cypress interface and wait for the tests to run.
        Headless Mode (Without GUI)
        To run the tests in headless mode, follow these steps:
            npx cypress run
This will execute the tests in headless mode and display the results in the terminal.

Read the following doc to get a list of the possible test cases that could be written for this app.



Read the following [doc](./docs/TestCases.md) to get a list of the possible test cases that could be written for this app.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).

