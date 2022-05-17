# Custom Chain

## Access

### Remote

- RPC URL:
  - `https://chain.blktrc.planetenangst.de`
- Chain ID
  - `4242`
- Blockexplorer
  - `https://explorer.blktrc.planetenangst.de`


### Local

- RPC URL:
  - `http://localhost:8545`
- Chain ID
  - `4242`
- Blockexplorer
  - `http://localhost:4000`


## Commands

```bash
# start chain including explorer
./scripts/run-docker.sh

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
        address: "0x20A881b4ad38058C35D68A0FAec44E80080F2192",
        secret:  "0x221a47143c58591673f2f43395da8c956f917c48bf429f421f9fd1ec9d4ccb97"
    },{
        address: "0x6947B7a7292904b76F83506C8c87a9CD26DF4E94",
        secret:  "0x873c5ad9e79e599725caa23f0fe139c0d14880472e6d688dffbd3cd380fe5fbe"
    },{
        address: "0x3aF28409c4F4381E0702c9B7587fC0f5C1b5a3c7",
        secret:  "0x3717c773ae7ce7a0a92cfcccfedc3a1ff43c18428ab1e84f83f8be5aa04637d9"
    },{
        address: "0x7d19FC09bD80F2258715AA5e50dCB085dda92c4E",
        secret:  "0x162fb47ac938ec28a8d40245893efca287a4f0dc2d258dc6b813513612b730f1"
    },{
        address: "0x94004CE59c867F336eb04e8314b199fC85562438",
        secret:  "0xf2778ad065d4e9c4391c8c6a2f2971fc649f3403046d758c91fb684ec32efd78"
    },{
        address: "0x06faB5aa12B1Aa3ac2Dad255cC1344c02cd365f4",
        secret:  "0x35ff60ffe9a37110e2bc4b3a3f0dbdab61ddb4c179232f909708b6507f802766"
    },{
        address: "0x042D5C660F2fD264eB2651C82aBC924A2b19707d",
        secret:  "0xf31e47a4f19a7f6e7fa9670e5a81babd45cfc96b8aa6d47dafb0d97aee408426"
    },{
        address: "0x8c025C6bcE75278446f16eFb40a06BfdA3fB6410",
        secret:  "0xe5aac27556ae8e2b088d1ef47577e7efc538ea0123ae9e0c4d37b96c9f0917cc"
    },{
        address: "0x1534454A3314BC8dc4B56386d27A6bcE5Fa4fF69",
        secret:  "0x80c937eca0acdb023fae9115d6bc1f6da70d33a624fb37dcd0f07123f809472a"
    },{
        address: "0x23E74dE9EE4649d91D71d67c6dB9cBF596c5f0E0",
        secret:  "0x44cd7d4f47b2cd448c7c385e46c298bed2e02f295482b3464a65e4b540fc2d7d"
    }
];
```

