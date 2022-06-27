# Company Client

This folder contains the company's client project. To begin development, you must have [Node.js](https://nodejs.org/en/) and the [Yarn](https://yarnpkg.com) package manager installed.

You also need a valid `.env` file. The easiest way to get one is by copying the `example.env` file and rename the copy to `.env`. The default setup should be good to go.

## Commands

```bash
# start in watch mode
yarn dev

# lint
yarn lint

# autofix lint errors
yarn lint:fix

# test
yarn test

# build production
yarn build

# start in production mode
yarn start
```

To start 2 instances follow these steps:

````bash
# start dev db for instance 1
./scripts/run-dev-db-1.sh

# start dev db for instance 2
./scripts/run-dev-db-2.sh

# run pre-configured instance 1 in dev mode
yarn dev:1

# run pre-configured instance 2 in dev mode IN ANOTHER TERMINAL
yarn dev:2
````

To build the docker image, run:
``` bash
./scripts/build-docker-image.sh
```