#!/bin/bash

# Builds demo images on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

RELATIVE_COMPANY_CLIENT_PATH="../../company-client"
RELATIVE_OPERATOR_PATH="../../operator"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

echo "[INFO] Build company client image"
cd ${HERE}/${RELATIVE_COMPANY_CLIENT_PATH}
./scripts/build-docker-image.sh

echo "" && echo "[INFO] Build operator image"
cd ${HERE}/${RELATIVE_OPERATOR_PATH}
./scripts/build-docker-image.sh