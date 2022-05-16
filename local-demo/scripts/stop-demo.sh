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

cd ${HERE}/../config
${SUDO} docker-compose -p dibichain-logistex -f docker-compose-local-logistex.yml down
${SUDO} docker-compose -p dibichain-logistly -f docker-compose-local-logistly.yml down
${SUDO} docker-compose -p dibichain-operator -f docker-compose-local-operator.yml down