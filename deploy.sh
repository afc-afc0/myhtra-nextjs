#!/bin/bash

# Deployment script for Myhtra Next.js application
# Builds the Docker image tagged with the current commit, pushes it, and points
# the Kubernetes deployment at that exact tag (so a rollback is just the previous SHA)

set -euo pipefail  # Exit on any error, unset variable or failed pipe

IMAGE="icanjump/myhtra-nextjs"
DEPLOYMENT="myhtra-deployment"
CONTAINER="nextjs"  # must match image.containerName in .helm/myhtra/values.yaml

# Only deploy committed code, so the image tag really identifies what is running
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Working tree has uncommitted changes. Commit or discard them before deploying."
    exit 1
fi

TAG="$(git rev-parse --short HEAD)"

echo "🚀 Starting deployment of Myhtra Next.js at ${TAG}..."

echo "📦 Building Docker image..."
sudo docker build . -t "${IMAGE}:${TAG}" -t "${IMAGE}:latest"
echo "✅ Docker image built successfully"

echo "📤 Pushing image to Docker registry..."
sudo docker push "${IMAGE}:${TAG}"
sudo docker push "${IMAGE}:latest"
echo "✅ Image pushed successfully"

echo "🔄 Rolling out ${IMAGE}:${TAG}..."
kubectl set image "deployment/${DEPLOYMENT}" "${CONTAINER}=${IMAGE}:${TAG}"
kubectl rollout status "deployment/${DEPLOYMENT}" --timeout=5m
echo "✅ Kubernetes deployment rolled out successfully"

echo "🎉 Deployment of ${TAG} completed successfully!"
