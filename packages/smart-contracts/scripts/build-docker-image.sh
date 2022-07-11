#!/bin/bash

# Builds the docker image

###################################################################################################
# CONFIGURATION
###################################################################################################

IMAGE_NAME="contract-deployer"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

docker build -f ${HERE}/../docker/Dockerfile ${HERE}/.. -t ${IMAGE_NAME}