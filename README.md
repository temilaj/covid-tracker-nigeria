# Coronavirus tracker for Nigeria

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![License: MIT](https://img.shields.io/github/v/release/temilaj/covid-tracker-nigeria)](https://opensource.org/licenses/MIT)

open source Coronavirus (COVID-19) API for Nigeria

## DISCLAIMER

This web resource depends on data gotten from [NCDC](https://ncdc.gov.ng/) ([@NCDCgov](https://twitter.com/NCDCgov)). At the moment, the NCDC does not publish data on COVID-19 related recoveries and deaths for each state. Hence,  **PLEASE DO NOT** rely on this data for state specific deaths and recoveries. Instead only use Data for state specific confirmed cases, as well as the the total number (country wide) confirmed cases, deaths and recoveries.

## Setting up

+ Clone this project to any folder on your local machine

```bash
git clone git@github.com:temilaj/covid-tracker-nigeria.git <FOLDER_NAME_HERE>
```

+ Navigate into the folder name specified

```bash
cd <FOLDER_NAME_HERE>
```

+ install included packages

```bash
yarn install
# or
npm install
```

+ create a .env file in the root of your project using the .sample.env file as a guide and populate values with your preferred options.  

+ install the Prisma CLI

```bash
yarn add global prisma
# or
npm install -g prisma
```

+ Launch Prisma and the connected database

```bash
docker-compose up -d
```

+ Deploy the datamodel to your local Prisma instance

```bash
yarn deploy
# or
npm run deploy
```

## Running the API Server in Development

Run `yarn start` or `npm start` to initialize and run the development server on the port you specified in the .env file.

## Additional resources

+ [Prisma Setup](https://v1.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/#launch-prisma-and-the-connected-database)

## LICENSE

### [MIT](./License.md) © [Temi Lajumoke](http://temilajumoke.com)