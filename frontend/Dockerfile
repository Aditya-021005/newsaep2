# Use Node.js 20 slim as base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install packages
RUN npm install

# Copy all files
COPY . .

# Expose the Vite port
EXPOSE 5173

# Vite needs --host to allow access from outside the container
CMD ["npm", "run", "dev", "--", "--host"]
