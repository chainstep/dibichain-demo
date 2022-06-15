FROM node:16.11.1-alpine3.11

# Set working directory
WORKDIR /usr/app

# Copy meta files
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install --prod

# Copy source files
COPY dist/src ./dist/src

# Start node
CMD [ "yarn", "start" ]