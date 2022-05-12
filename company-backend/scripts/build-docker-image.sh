#!/bin/bash

# Builds the docker image

###################################################################################################
# CONFIGURATION
###################################################################################################

IMAGE_NAME="company-backend"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

yarn build

# multi-arch build -> https://blog.jaimyn.dev/how-to-build-multi-architecture-docker-images-on-an-m1-mac/
BUILD_CMD="build"
if [[ $(uname) == "Darwin" && $(uname -a) == *"arm64"* ]]; then
    BUILD_CMD="buildx build --platform linux/amd64 --load"
fi

docker ${BUILD_CMD} -f ${HERE}/../docker/Dockerfile ${HERE}/.. -t ${IMAGE_NAME}