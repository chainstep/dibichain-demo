# Custom Chain

## Access

- RPC URL:
  - `http://localhost:8545`
- Chain ID
  - `4243`
- Blockexplorer
  - `http://localhost:4000`


## Commands

```bash
# start chain including explorer
./scripts/run-docker.sh

# start chain including explorer in detached mode
./scripts/run-docker.sh -d

# stop chain including explorer
./scripts/pause-docker.sh

# stop and remove chain including explorer
./scripts/stop-docker.sh

# deploy chain including explorer (works with known ssh key only)
./scripts/deploy.sh
```


## Accounts
```ts
const ACCOUNTS = [
    {
        address: "0x216518758F1Ea6C77fB2604D3224bF6EeC32164B",
        secret:  "0x786e523ddd21e8c2524ea5da3c8b9b0498b40419aee35e131a6219212ee66b76"
    },{
        address: "0x8fA98E72788A9200B41113728F8aDEd1597a99FE",
        secret:  "0xce603e4a7db7c0c7fc74937792124c36396d5d9999b357384fd142b4f8e85320"
    },{
        address: "0x17c3Fd10893Ce61938674b0d8F866C9a910817EB",
        secret:  "0xe6587abf7617348b3208e7964ceb649eaa30a04a7add0eb893ba15b14e9249f0"
    },{
        address: "0x5F218281677e84979FC2f316749eF9129eB1fe10",
        secret:  "0x61d01527bdb17f9207a3e97feee8e8fed31b86add30bdbc83848ed9aa0fa3e05"
    },{
        address: "0x0516dDb5CA2fcf15F068Cb887Ca52b5cc80acd32",
        secret:  "0x1f1b105000b2521e328569724eef1477313b92eb80e5fec9d502bc2e971e5955"
    },{
        address: "0xcc0C002a499A0373aAe97B9BdD7b56A20CAf70D1",
        secret:  "0xcc910c84983d0b539b4421041f60d90fcb5d3e13a7392edf52b92f1e0ecea7cc"
    },{
        address: "0x0EB0077e802902f83544E177672Eb3339835C388",
        secret:  "0x6b28a99e7b12942ba06f210ce3f39a9d5d17b8e23b8398e6347a2c56617fff3f"
    },{
        address: "0x3006AC3bE9eE8e9beb5d314AFE41C39ED520eA11",
        secret:  "0xcf7f1ca84a33de6e86246377020f2a99c4f42dee28d519102757b4ab57a3ab1f"
    },{
        address: "0xE6F747c1549bf428EE52214ba280801fe1129ED5",
        secret:  "0x5f8d67a3c24599a720f27d7382c35747b64c709296438ed458473acd80cf9869"
    },{
        address: "0x765e538ED9AF9514aa649779e17d5d37e3628fb8",
        secret:  "0x5fea76d0bd04a2427eb460407d45f81969faa9eb9ea6133abaa8881c113a11d8"
    }
];
```

