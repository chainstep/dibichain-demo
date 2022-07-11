# Local Dibichain Demo

This folder holds the configuration needed to run the dibichain demo locally on your machine. The only precondition is that you have [Docker](https://www.docker.com) and docker compose installed. It is also required to be able to execute bash scripts. If your operating system is Unix based, you are ready to go. If you're on Windows, try [WSL](https://docs.microsoft.com/en-gb/windows/wsl/install) or [Cygwin](https://www.cygwin.com).


## TL; DR;

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

Logistex
- frontend url: http://localhost:3101
- client url: http://localhost:3100
- client api docs url: http://localhost:3100/api-docs

Logistly
- frontend url: http://localhost:3201
- client url: http://localhost:3200
- client api docs url: http://localhost:3200/api-docs

Operator
- api url: http://localhost:3000

Explorer
- explorer url: http://localhost:4000


## Starting the demo

First you need to build the docker images with:
```bash
./scripts/build-demo.sh
```

After that, run the demo with:
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