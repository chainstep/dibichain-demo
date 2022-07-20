#!/bin/bash

# Populates the demo with default products

###################################################################################################
# CONFIGURATION
###################################################################################################

RELATIVE_RESOURCES_PATH="../../resources"


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
echo "[INFO] Populating products..."
${SUDO} docker-compose -p product-populator -f docker-compose-local-product-populator.yml up
${SUDO} docker-compose -p product-populator -f docker-compose-local-product-populator.yml down

echo "[INFO] Done."