#!/bin/bash

# Runs the development database container

###################################################################################################
# CONFIGURATION
###################################################################################################

IMAGE_NAME="mongo:4.4.1-bionic"
CONTAINER_NAME="company-backend-dev-db-1"

INTERNAL_PORT=27017
EXTERNAL_PORT=27017


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

${SUDO} docker run --publish ${EXTERNAL_PORT}:${INTERNAL_PORT} --detach --name ${CONTAINER_NAME} ${IMAGE_NAME}