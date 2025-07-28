#!/bin/bash

# Set execute permissions for react-scripts
chmod +x node_modules/.bin/react-scripts

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set execute permissions for react-scripts in frontend
chmod +x node_modules/.bin/react-scripts

# Build the project
npm run build