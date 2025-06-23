#!/bin/bash

# Deployment script for Myhtra Next.js application
# This script builds the Docker image, pushes it to the registry, and restarts the Kubernetes deployment

set -e  # Exit on any error

echo "🚀 Starting deployment process for Myhtra Next.js..."

# Build Docker image
echo "📦 Building Docker image..."
sudo docker build . -t icanjump/myhtra-nextjs

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Failed to build Docker image"
    exit 1
fi

# Push to registry
echo "📤 Pushing image to Docker registry..."
sudo docker push icanjump/myhtra-nextjs

if [ $? -eq 0 ]; then
    echo "✅ Image pushed successfully"
else
    echo "❌ Failed to push image to registry"
    exit 1
fi

# Restart Kubernetes deployment
echo "🔄 Restarting Kubernetes deployment..."
kubectl rollout restart deployment myhtra-deployment

if [ $? -eq 0 ]; then
    echo "✅ Kubernetes deployment restarted successfully"
else
    echo "❌ Failed to restart Kubernetes deployment"
    exit 1
fi

echo "🎉 Deployment completed successfully!"