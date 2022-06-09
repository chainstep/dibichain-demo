FROM node:16.11.1-alpine3.11

# Set working directory
WORKDIR /usr/app

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

# Start agent
CMD [ "yarn", "start:build" ]