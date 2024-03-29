#!/bin/bash

# Stops and removes the ganache test chain

###################################################################################################
# CONFIGURATION
###################################################################################################

PROJECT_NAME="dibichain-ganache"


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

cd ${HERE}/../docker
${SUDO} docker-compose -p ${PROJECT_NAME} down
