###################################################################################################
# BUILD PROJECT
###################################################################################################

FROM node:16.15.1-alpine3.16 as builder

# Copy meta files
COPY .eslintignore .
COPY .eslintrc.json .
COPY next-env.d.ts .
COPY tsconfig.json .
COPY next.config.js .
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy source files
COPY src ./src
COPY public ./public

# Building app
# 1. set dummy values for environment variables
# 2. build page with dummy values
RUN NEXT_PUBLIC_COMPANY_NAME=APP_NEXT_PUBLIC_COMPANY_NAME \
    NEXT_PUBLIC_BACKEND_BASE_URL=APP_NEXT_PUBLIC_BACKEND_BASE_URL \
    yarn build


###################################################################################################
# BUILD IMAGE
###################################################################################################

FROM node:16.15.1-alpine3.16 as runner

# Set working directory
WORKDIR /usr/app/

# Copy meta data
COPY --from=builder package.json ./package.json
COPY --from=builder yarn.lock ./yarn.lock

# Install dependencies
RUN yarn install --prod

# Copy compiled files
COPY --from=builder out ./out

# Copy misc files
COPY docker/entrypoint.sh .

# Set entrypoint
ENTRYPOINT ["/usr/app/entrypoint.sh"]

# Set start command
CMD [ "npm", "run", "start" ]