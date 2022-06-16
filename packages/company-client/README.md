# Company Backend #

```bash
# start in production mode
yarn start

# start in watch mode
yarn dev

# build production
yarn build

# lint
yarn lint

# autofix lint errors
yarn fix:lint

# test
yarn test

# build docker image
yarn build:docker

# start docker image
yarn start:docker

# pause docker image
yarn pause:docker

# stop docker image
yarn stop:docker
```

To start 2 instances follow these steps:

````bash
# start dev db for instance 1
./scripts/run-dev-db-1.sh

# start dev db for instance 2
./scripts/run-dev-db-2.sh

# run instance 1 in dev mode
yarn dev:1

# run instance 2 in dev mode IN ANOTHER TERMINAL
yarn dev:2
````