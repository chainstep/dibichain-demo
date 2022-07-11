#!/bin/sh

if [ -z ${RPC_URL} ]; then
    echo "Error: RPC_URL is missing"
    exit 1
fi

if [ -z ${CONTRACT_ADDRESS} ]; then
    echo "Error: CONTRACT_ADDRESS is missing"
    exit 1
fi

if [ -z ${DEPLOYER_SECRET} ]; then
    echo "Error: DEPLOYER_SECRET is missing"
    exit 1
fi

echo "Deploying to ${RPC_URL}..."
cd /usr/app/scripts
./deploy.sh -u ${RPC_URL} -c ${CONTRACT_ADDRESS} -s ${DEPLOYER_SECRET}

exec "$@"