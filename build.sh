#!/bin/bash

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Use npx to run react-scripts build (bypasses permission issues)
npx react-scripts build