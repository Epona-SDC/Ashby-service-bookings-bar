# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Server API: /api/rentals
> Supports GET and DELETE with an id paramater, ?id={number}
> To POST header should have Content-Type header of applicatio/json and no parameters. An id will be generated, but boody must contain all other fields in JSON format.
> PUT requires id parameter and same Content-Type header of applicatiob/json. The body must contain all updates to be made in JSON format.

> Original schema:
  _id: Number,
  price: Number,
  max_guests: Number,
  reviews: {
    numReviews: Number,
    avgStars: Number
  },
  fees: {
    cleaning_fee: Number,
    service_fee: Number,
    occupancy_fee: Number
  },
  availability: array of strings of mm/mm/yyyy dates

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

npm run makeCSVData to generate CSV data files.

Install Postgres
Create database "Availability"
Rename or copy /server/db/dbconfig.example.js to remove "example" and put in your database connection setting. Make sure there is superuser access for setup.
npm run pgSetup
-- sets up tables in postgres Availability database

Open file dataToFile.js
Uncomment the functions under the label "for Postgres:"
npm run makeCSVData

Use postgres shell command line for the following to load tables:
-copy dates from 'PATH_TO_FILE/dates.csv' delimiter ',' csv header;
-copy rentals from 'PATH_TO_FILE/rentals.csv' delimiter ',' csv header;
copy rentals_dates from 'PATH_TO_FILE/rentals_dates.csv' delimiter ',' csv header;


Install Cassandra
Create keyspace and table with schema laid out and end of dataGen.js file.

Open file dataToFile.js
Uncomment the functions under the label "for Cassandra"
npm run makeCSVData

Use Cassandra shell command line to run and load table:
-COPY rentals (id, price, maxGuests, numReviews, avgStars, cleaningFee, serviceFee, occupancyFee, availability) FROM '~/Hack Reactor/SDC/Ashby-service-bookings-bar/server/db/cassie_data.csv' WITH header = true AND DELIMITER = '|';


