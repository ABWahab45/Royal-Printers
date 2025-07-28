#!/bin/bash

# Build script for Vercel deployment
echo "Building Classic Royal Printers frontend..."

# Navigate to frontend directory
cd frontend

# Install dependencies
npm ci

# Build the React application
npm run build

echo "Frontend build completed successfully!"