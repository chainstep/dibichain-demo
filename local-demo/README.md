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

CAUTION: There is a chance that the block explorer is not working if you're on Apple Silicon.