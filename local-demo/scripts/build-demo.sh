#!/bin/bash

# Builds demo images on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

RELATIVE_COMPANY_CLIENT_PATH="../../company-client"
RELATIVE_COMPANY_FRONTEND_PATH="../../company-frontend"
RELATIVE_OPERATOR_PATH="../../operator"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

echo "[INFO] Building company client image..."
cd ${HERE}/${RELATIVE_COMPANY_CLIENT_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Building company frontend image..."
cd ${HERE}/${RELATIVE_COMPANY_FRONTEND_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Building operator image..."
cd ${HERE}/${RELATIVE_OPERATOR_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Done."