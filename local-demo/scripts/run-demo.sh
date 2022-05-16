#!/bin/bash

# Runs the demo on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

RELATIVE_COMPANY_CLIENT_PATH="../../company-client"
RELATIVE_OPERATOR_PATH="../../operator"

BUILD_IMAGES=false


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "b?" opt; do
    case "$opt" in
    b)
       BUILD_IMAGES=true
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

cd ${HERE}
if [ ${BUILD_IMAGES} == true ]; then 
    ./build-demo.sh
fi

SUDO=""
if [ $(uname) == Linux ]; then
    SUDO="sudo"
fi

cd ../config
${SUDO} docker-compose -p dibichain-logistex -f docker-compose-local-logistex.yml up -d
${SUDO} docker-compose -p dibichain-logistly -f docker-compose-local-logistly.yml up -d
${SUDO} docker-compose -p dibichain-operator -f docker-compose-local-operator.yml up -d