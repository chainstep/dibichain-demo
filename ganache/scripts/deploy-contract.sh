#!/bin/bash

# Deploys the contract to the local chain

###################################################################################################
# CONFIGURATION
###################################################################################################

RELATIVE_SMART_CONTRACTS_PATH="../../smart-contracts"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

cd ${HERE}/${RELATIVE_SMART_CONTRACTS_PATH}/scripts
./deploy-local.sh