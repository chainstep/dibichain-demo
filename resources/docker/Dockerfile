###################################################################################################
# BUILD PRODUCT POPULATOR
###################################################################################################

FROM node:16.15.1-alpine3.16

# Set working directory
WORKDIR /usr/app/

# Copy node scripts
COPY documentAdder.js .
COPY productAdder.js .

# Copy docker files
COPY docker/entrypoint.sh .

# Copy products
COPY products ./products

# Set entrypoint
ENTRYPOINT ["/usr/app/entrypoint.sh"]