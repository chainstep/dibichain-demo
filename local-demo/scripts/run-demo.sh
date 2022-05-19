#!/bin/bash

# Runs the demo on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

BLOCK_CHAIN_WAITING_TIME_SECONDS=20

BUILD_IMAGES=false
RELATIVE_SMART_CONTRACTS_PATH="../../smart-contracts"


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "h?b?" opt; do
    case "$opt" in
        h)
            echo "Parameter: [<value> / (flag)]"
            echo "-b (build docker images)"
            exit 0
            ;;
        b)
            BUILD_IMAGES=true
            ;;
    esac
done


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

cd ${HERE}
if [ ${BUILD_IMAGES} == true ]; then 
    ./build-demo.sh
fi

SUDO=""
if [ $(uname) == Linux ]; then
    SUDO="sudo"
fi

cd ../config
echo "[INFO] Starting local chain..."
${SUDO} docker-compose -p dibichain-chain -f docker-compose-local-chain.yml up -d

echo "[INFO] Waiting for local chain to be started..."
sleep ${BLOCK_CHAIN_WAITING_TIME_SECONDS}

echo "[INFO] Deploying contract..."
cd ${HERE}/${RELATIVE_SMART_CONTRACTS_PATH}/scripts
./deploy-local.sh
EXIT_CODE=$(echo $?)

if [ ${EXIT_CODE} == 1 ]; then
    exit 1;
fi

echo "[INFO] Starting participants..."
cd ${HERE}/../config
${SUDO} docker-compose -p dibichain-operator -f docker-compose-local-operator.yml up -d
${SUDO} docker-compose -p dibichain-logistex -f docker-compose-local-logistex.yml up -d
${SUDO} docker-compose -p dibichain-logistly -f docker-compose-local-logistly.yml up -d

echo "[INFO] Done."