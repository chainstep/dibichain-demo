# Local Dibichain Demo

You can run the dibichain demo locally on your unix based machine. If you're on Windows try [wsl](https://docs.microsoft.com/en-gb/windows/wsl/install).

## TL;DR;

**Start**
```bash
./scripts/run-demo.sh -b
```

**Stop**
```bash
./scripts/stop-demo.sh
```

**Reset**
```bash
./scripts/reset-demo.sh
```

**URLs**

- operator
  - http://localhost:3000
- logistex
  - client
    - http://localhost:3100
  - frontend
    - http://localhost:3101
- logistly
  - client
    - http://localhost:3200
  - frontend
    - http://localhost:3201
- explorer
  - http://localhost:4000

## Starting the demo
First you need to build the docker images with:
```bash
./scripts/build-demo.sh
```

After that run the demo with:
```bash
./scripts/run-demo.sh
```

You can also build the images automatically before running the demo with:
```bash
./scripts/run-demo.sh -b
```

You can stop the demo with:
```bash
./scripts/stop-demo.sh
```

And reset the demo with:
```bash
./scripts/reset-demo.sh
```


## Trouble Shooting

### Block explorer does not work

Unfortunately, there is a big chance that the block explorer is not working if you're on Apple Silicon. No fix right now.


### Run script stops while contract deployment

If you face the following error message while deploying the contract:
```
could not detect network (event="noNetwork", code=NETWORK_ERROR, version=providers/5.6.6)
```
ganache (the local chain) is not started yet. You need to wait some time (depending on your machine) for ganache to be started. You can increase the waiting time by increasing the `BLOCK_CHAIN_WAITING_TIME_SECONDS` at the top of the `run-demo.sh` file. Default is 20 seconds.


### Cannot connect to frontend

Since starting a company-frontend container involves creating an optimized production build, it can take up to 5 minutes until the frontend is started and running. This depends heavily on your machine. Just be patient and try it again after some time :).