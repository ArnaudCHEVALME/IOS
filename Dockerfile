# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Install Yarn package manager
RUN apk add --no-cache yarn

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the API
EXPOSE 3000

# Start the API server
CMD [ "yarn", "start" ]
