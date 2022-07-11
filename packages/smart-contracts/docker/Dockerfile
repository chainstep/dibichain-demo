###################################################################################################
# BUILD CONTRACT BUILDER
###################################################################################################

FROM ubuntu:20.04

# Install tools
RUN apt update
RUN apt install git -y
RUN apt install curl -y
RUN apt install build-essential -y
RUN curl -s https://deb.nodesource.com/setup_16.x | bash
RUN apt install nodejs -y
RUN npm install --global yarn

# Set working directory
WORKDIR /usr/app/

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

# Copy metadata
COPY tsconfig.json .
COPY hardhat.config.ts .
COPY .solhint.json .
COPY .solhintignore .
COPY .eslintrc.js .
COPY .eslintignore .

# Copy docker files
COPY deployment ./deployment
COPY docker/entrypoint.sh .
COPY scripts ./scripts

# Copy source files
COPY tools ./tools
COPY test ./test
COPY contracts ./contracts

# Set entrypoint
ENTRYPOINT ["/usr/app/entrypoint.sh"]