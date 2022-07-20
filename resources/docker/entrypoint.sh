#!/bin/sh

if [ -z ${LOGISTEX_URL} ]; then
    echo "Error: LOGISTEX_URL is missing"
    exit 1
fi


echo "Add Scalmalloy Part..."
cd /usr/app
node ./productAdder.js ${LOGISTEX_URL} ./products/scalmalloy-part/scalmalloy-part.json
node ./documentAdder.js ${LOGISTEX_URL} 8181c8ae-eef1-4703-8498-2cf25be2877b ./products/scalmalloy-part/Carbon_Footprint_Report_Scalmalloy_AP12345.pdf

exec "$@"