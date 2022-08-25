#!/bin/bash

# Builds the docker image

###################################################################################################
# CONFIGURATION
###################################################################################################

IMAGE_NAME="operator"
FORCE_AMD64=false


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "h?a?" opt; do
    case "$opt" in
    h)
        echo "Parameter: [<value> / (flag)]"
        echo "-a  (force amd64 architecture image)"
        exit 0
        ;;
    a)  
       FORCE_AMD64=true
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

SUDO=""
if [ $(uname) == Linux ]; then
    SUDO="sudo"
fi

# multi-arch build -> https://blog.jaimyn.dev/how-to-build-multi-architecture-docker-images-on-an-m1-mac/
BUILD_CMD="build"
if [ ${FORCE_AMD64} == true ]; then
    BUILD_CMD="buildx build --platform linux/amd64 --load"
fi

${SUDO} docker ${BUILD_CMD} -f ${HERE}/../docker/Dockerfile ${HERE}/.. -t ${IMAGE_NAME}