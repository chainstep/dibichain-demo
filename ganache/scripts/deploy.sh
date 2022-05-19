#!/bin/bash

# Deploys the docker-compose project to a server with ssh access via pubkey

###################################################################################################
# CONFIGURATION
###################################################################################################

SSH_DOMAIN="dibichain@chain.dibichain.de"
FOLDER_NAME="dibichain-ganache"


###################################################################################################
# DEFINES
###################################################################################################

SERVER_FOLDER="${SSH_DOMAIN}:${FOLDER_NAME}"
HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

cd ${HERE}

echo "[INFO] Copying files to server ..."
ssh -t ${SSH_DOMAIN} "mkdir -p ${FOLDER_NAME}/scripts"
ssh -t ${SSH_DOMAIN} "mkdir -p ${FOLDER_NAME}/docker"
ssh -t ${SSH_DOMAIN} "mkdir -p ${FOLDER_NAME}/docker/envs"

scp ./run-docker.sh "${SERVER_FOLDER}/scripts"
scp ./pause-docker.sh "${SERVER_FOLDER}/scripts"
scp ./stop-docker.sh "${SERVER_FOLDER}/scripts"
scp ../docker/docker-compose.yml "${SERVER_FOLDER}/docker"

ssh -t ${SSH_DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/run-docker.sh"
ssh -t ${SSH_DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/pause-docker.sh"
ssh -t ${SSH_DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/stop-docker.sh"


echo "" && echo "[INFO] (Re)starting custom chain on server ..."
ssh -t ${SSH_DOMAIN} "cd ./${FOLDER_NAME}/scripts && ./stop-docker.sh"
ssh -t ${SSH_DOMAIN} "cd ./${FOLDER_NAME}/scripts && ./run-docker.sh"


echo "" && echo "[INFO] Done. Update deployed ..."