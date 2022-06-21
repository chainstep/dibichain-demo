#!/bin/sh

echo "Check that we have BACKEND_BASE_URL env"
test -n "$BACKEND_BASE_URL"
echo "Check that we have COMPANY_NAME env"
test -n "$COMPANY_NAME"

echo "Replace dummy values with values of environment variables"
find /usr/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_BACKEND_BASE_URL#$BACKEND_BASE_URL#g"
find /usr/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_COMPANY_NAME#$COMPANY_NAME#g"

echo "Starting Nextjs"
exec "$@"