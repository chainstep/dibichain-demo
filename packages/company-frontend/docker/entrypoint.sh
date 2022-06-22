#!/bin/sh

echo "Initializing..."
if [ -z "$BACKEND_BASE_URL" ]; then
    echo "Error: BACKEND_BASE_URL is missing"
    exit 1
fi

if [ -z "$COMPANY_NAME" ]; then
    echo "Error: COMPANY_NAME is missing"
    exit 1
fi

# Replace dummy values with environment variables values
find /usr/app/out \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_BACKEND_BASE_URL#$BACKEND_BASE_URL#g"
find /usr/app/out \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_COMPANY_NAME#$COMPANY_NAME#g"


echo "Starting Nextjs..."
exec "$@"