#!/bin/bash

# Builds the docker image

###################################################################################################
# CONFIGURATION
###################################################################################################

IMAGE_NAME="company-frontend"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

BUILD_CMD="build"

while getopts "a" opt; do
    case "$opt" in
    a)  # multi-arch build -> https://blog.jaimyn.dev/how-to-build-multi-architecture-docker-images-on-an-m1-mac/
        BUILD_CMD="buildx build --platform linux/amd64 --load"
    esac
done

echo ${BUILD_CMD}
docker ${BUILD_CMD} -f ${HERE}/../docker/Dockerfile ${HERE}/.. -t ${IMAGE_NAME}