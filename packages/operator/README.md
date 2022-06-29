# Operator

This folder contains the operator project. To begin development, you must have [Node.js](https://nodejs.org/en/) and the [Yarn](https://yarnpkg.com) package manager installed. 

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


To build the docker image, run:
``` bash
./scripts/build-docker-image.sh
```


## API Documentation

You can find the API documentation under the `/api-docs` route.