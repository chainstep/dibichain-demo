#!/bin/bash

# Runs the demo on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

BUILD_IMAGES=false


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "h?b?" opt; do
    case "$opt" in
        h)
            echo "Parameter: [<value> / (flag)]"
            echo "-b (build docker images)"
            echo "-d (run in detached mode)"
            exit 0
            ;;
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
${SUDO} docker-compose -p dibichain-chain -f docker-compose-local-chain.yml up -d
${SUDO} docker-compose -p dibichain-operator -f docker-compose-local-operator.yml up -d
${SUDO} docker-compose -p dibichain-logistex -f docker-compose-local-logistex.yml up -d
${SUDO} docker-compose -p dibichain-logistly -f docker-compose-local-logistly.yml up -d