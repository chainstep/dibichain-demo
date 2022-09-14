#!/bin/bash

# Stops the local demo

###################################################################################################
# CONFIGURATION
###################################################################################################


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

SUDO=""
if [ $(uname) == Linux ]; then
    SUDO="sudo"
fi

echo "[INFO] Stopping and removing docker containers..."
cd ${HERE}/../config
${SUDO} docker-compose -p dibichain-logistex -f docker-compose-local-logistex.yml down
${SUDO} docker-compose -p dibichain-logistly -f docker-compose-local-logistly.yml down
${SUDO} docker-compose -p dibichain-operator -f docker-compose-local-operator.yml down
${SUDO} docker-compose -p dibichain-chain -f docker-compose-local-chain.yml down
${SUDO} docker volume prune -f

echo "[INFO] Done."