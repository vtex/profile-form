## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

- A few symlinks are necessary before the app is ready for npm commands. These are accomplished by running `npm run symlinks`.

- Running `npm install` in the components's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.

## Building for IO

Running `releasy [major/minor/patch] --stable --npm` should bump version on both `package.json` and `manifest.json`, build/publish to NPM and also build/publish to IO.
