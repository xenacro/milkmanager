## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 18.x or higher is required.

Installation the dependecies using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install
```

## Features
Run the UI for database using prisma with npx or yarn.
```console
$ npx prisma studio
```


## Quick Start

  Assuming all the dependecies are installed sucessfully.
  Create an environement variable file at root directory name ".env"
  ```console
  PORT=port to run the application on
  DATABASE_URL=URL to the mongodb
  ```

  Generate databse for prisma with npx or yarn

  ```console
  $ npm run prebuild
  ```

  For Developemt and testing start the server with nodemon
  
  ```console
  $ npm run dev
  ```

  Start the server for testing:

  ```console
  $ npm start
  ```

  If started access the API Documentation at:
  - /swagger

  View the website at: https://milkmanager.herokuapp.com/