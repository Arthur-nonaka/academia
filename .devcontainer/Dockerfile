# Use an official Node.js runtime as a parent image.
FROM node:22-bookworm

# Set the working directory.
WORKDIR /workspace

# Install TypeScript globally.
RUN npm install -g typescript

RUN apt-get update && apt-get install -y default-mysql-client

# Copy package.json and package-lock.json (if available) and install dependencies.
COPY package*.json ./
RUN npm install --unsafe-perm --verbose

# Copy the rest of your app's source code.
COPY . .

# Expose the port your Next.js app runs on.
EXPOSE 3000

EXPOSE 3306

# Command to run your app in development mode (adjust as needed).
CMD ["npm", "run", "dev"]
