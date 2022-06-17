#!/bin/bash

# Deploys the contract locally if not already deployed

###################################################################################################
# CONFIGURATION
###################################################################################################

CONTRACT_ADDRESS="0xC0156004b2dC4AA2FA30FD0F5E06b7022c718da7"

RPC_URL_LOCAL="http://localhost:8545"
RPC_URL_REMOTE="https://chain.dibichain.de"

DESTINATION="local"


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "h?u:d:" opt; do
    case "$opt" in
        h)
            echo "Parameter: [<value> / (flag)]"
            echo "-d <destination: local/remote>"
            exit 0
            ;;
        u)
            RPC_URL=$OPTARG
            ;;
        d)
            DESTINATION=$OPTARG
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

RPC_URL=""
if [ ${DESTINATION} == "remote" ]; then # not deployed
    RPC_URL=${RPC_URL_REMOTE}
else
    RPC_URL=${RPC_URL_LOCAL}
fi

cd ${HERE}/..
yarn

npx ts-node ./tools/contractDeploymentChecker.ts ${RPC_URL} ${CONTRACT_ADDRESS}
EXIT_CODE=$(echo $?)

if [ ${EXIT_CODE} == 1 ]; then # not deployed
    yarn deploy:${DESTINATION}
elif [ ${EXIT_CODE} == 2 ]; then # error
    exit 1;
else
    echo "[INFO] Contract already deployed."
fi
