#!/bin/bash

# Vercel build script for ReviewReady
echo "Starting ReviewReady build process..."

# Install root dependencies
echo "Installing root dependencies..."
npm ci

# Navigate to client and build React app
echo "Building React client..."
cd client
npm ci
npm run build

echo "Build completed successfully!"
