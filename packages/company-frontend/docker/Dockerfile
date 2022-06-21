FROM node:16-alpine as builder

WORKDIR /usr/app

# Copy meta files
COPY .eslintignore .
COPY .eslintrc.json .
COPY next-env.d.ts .
COPY tsconfig.json .
COPY next.config.js .
COPY package.json .
COPY yarn.lock .
COPY docker/entrypoint.sh .

# Copy source files
COPY public ./public
COPY src ./src

# Install deps
RUN yarn

# Building app
# 1. set dummy values for environment variables
# 2. build page with dummy values
RUN NEXT_PUBLIC_COMPANY_NAME=APP_NEXT_PUBLIC_COMPANY_NAME \
    NEXT_PUBLIC_BACKEND_BASE_URL=APP_NEXT_PUBLIC_BACKEND_BASE_URL \
    yarn build

FROM node:16-alpine as runner

WORKDIR /usr/app/

COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/entrypoint.sh ./entrypoint.sh

ENTRYPOINT ["/usr/app/entrypoint.sh"]

CMD [ "yarn", "start" ]