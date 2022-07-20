#!/bin/bash

# Builds demo images on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

RELATIVE_COMPANY_CLIENT_PATH="../../packages/company-client"
RELATIVE_COMPANY_FRONTEND_PATH="../../packages/company-frontend"
RELATIVE_OPERATOR_PATH="../../packages/operator"
RELATIVE_SMART_CONTRACTS_PATH="../../packages/smart-contracts"
RELATIVE_RESOURCES_PATH="../../resources"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

cd ${HERE}

echo "[INFO] Building company client image..."
cd ${HERE}/${RELATIVE_COMPANY_CLIENT_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Building company frontend image..."
cd ${HERE}/${RELATIVE_COMPANY_FRONTEND_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Building operator image..."
cd ${HERE}/${RELATIVE_OPERATOR_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Building contract deployer image..."
cd ${HERE}/${RELATIVE_SMART_CONTRACTS_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Building product populator image..."
cd ${HERE}/${RELATIVE_RESOURCES_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Done."