#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Deployment..."

# 1. Pull the latest code from GitHub
echo "📥 Pulling latest changes from Git..."
git pull origin main

# 2. Rebuild and restart the containers
echo "🏗️ Building and starting containers..."
# Load environment variables from .env.prod for Docker Compose interpolation
if [ -f .env.prod ]; then
    export $(grep -v '^#' .env.prod | xargs)
fi

# Stop existing containers if they are running
docker compose -f docker-compose.prod.yml down

# We use -f to specify the production file and --build to ensure images are updated
docker compose -f docker-compose.prod.yml up -d --build

# 3. Cleanup unused images to save disk space on the server
echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "✅ Deployment complete! Your app is running at http://13.60.197.21"
