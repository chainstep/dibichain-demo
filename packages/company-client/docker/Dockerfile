###################################################################################################
# BUILD PROJECT
###################################################################################################

FROM node:16.15.1-alpine3.16 as builder

# Copy meta files
COPY .eslintignore .
COPY .eslintrc.json .
COPY tsconfig.json .
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy source files
COPY src ./src

# Create a dummy test file to get the correct folder structure compiled
RUN mkdir test && touch test/index.ts && echo "console.log('dummy')" > test/index.ts

# Build app
RUN yarn build


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
COPY --from=builder dist/src ./dist/src

# Set start command
CMD [ "yarn", "start" ]