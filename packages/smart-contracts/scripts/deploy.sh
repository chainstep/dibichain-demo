#!/bin/bash

# Deploys the contract if not already deployed

###################################################################################################
# CONFIGURATION
###################################################################################################

CONTRACT_ADDRESS="0xC0156004b2dC4AA2FA30FD0F5E06b7022c718da7"
RPC_URL="http://localhost:8545"
DEPLOYER_SECRET="0x786e523ddd21e8c2524ea5da3c8b9b0498b40419aee35e131a6219212ee66b76"


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "h?u:c:s:" opt; do
    case "$opt" in
        h)
            echo "Parameter: [<value> / (flag)]"
            echo "-c <contract address>"
            echo "-s <deployer secret>"
            echo "-u <rpc url>"
            exit 0
            ;;
        c)
            CONTRACT_ADDRESS=$OPTARG
            ;;
        s)
            DEPLOYER_SECRET=$OPTARG
            ;;
        u)
            RPC_URL=$OPTARG
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

cd ${HERE}/..

echo "Check if contract is already deployed..."
RPC_URL=${RPC_URL} CONTRACT_ADDRESS=${CONTRACT_ADDRESS} yarn check:contract
EXIT_CODE=$(echo $?)

if [ ${EXIT_CODE} == 3 ]; then # not deployed
    echo "Not deployed (exit code 3). Deploying..."
    RPC_URL=${RPC_URL} DEPLOYER_SECRET=${DEPLOYER_SECRET} yarn deploy
elif [ ${EXIT_CODE} == 2 ]; then # error
    exit 1;
else
    echo "Contract already deployed. Skip deployment"
fi
