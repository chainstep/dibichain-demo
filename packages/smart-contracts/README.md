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
RPC_URL=http://localhost:8545 DEPLOYER_SECRET=0x786e523ddd21e8c2524ea5da3c8b9b0498b40419aee35e131a6219212ee66b76 yarn deploy

# or use the following command to check if it's already deployed before deploying it
# (use ./scripts/deploy.sh -h for help)

./scripts/deploy.sh -u http://localhost:8545 -s 0x786e523ddd21e8c2524ea5da3c8b9b0498b40419aee35e131a6219212ee66b76 -c 0xC0156004b2dC4AA2FA30FD0F5E06b7022c718da7
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
