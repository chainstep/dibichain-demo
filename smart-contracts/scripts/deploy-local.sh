#!/bin/bash

# Deploys the contract locally if not already deployed

###################################################################################################
# CONFIGURATION
###################################################################################################

CONTRACT_ADDRESS="0xC0156004b2dC4AA2FA30FD0F5E06b7022c718da7"
RPC_URL="http://localhost:8545"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

cd ${HERE}/..
yarn
npx ts-node ./tools/contractDeploymentChecker.ts ${RPC_URL} ${CONTRACT_ADDRESS}
EXIT_CODE=$(echo $?)

if [ ${EXIT_CODE} == 1 ]; then # not deployed
    yarn deploy:local
elif [ ${EXIT_CODE} == 2 ]; then # error
    exit 1;
else
    echo "[INFO] Contract already deployed."
fi
