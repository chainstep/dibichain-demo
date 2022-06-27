# Smart Contracts

This folder contains the event bus project. To begin development, you must have [Node.js](https://nodejs.org/en/) and the [Yarn](https://yarnpkg.com) package manager installed.


## Commands

```bash
# test
yarn test

# test coverage
yarn coverage

# build production
yarn build

# clean build production
yarn build:clean

# deploy to local chain
## CAUTION: you must have a local custom chain running. See ../../ganache folder
yarn deploy:local
```


## Running tools

You can run the tools with the following command:
```bash
npx ts-node <script path name>
```

for example:
```bash
npx ts-node tools/accountGenerator -h
```
