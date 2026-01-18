#!/bin/bash

echo "========================================"
echo "Starting Coffee Leaf Nutrition Prediction Frontend Server"
echo "========================================"
echo ""

cd frontend/public

echo "Starting frontend server..."
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "Make sure the backend is running on http://localhost:5000"
echo ""

python3 -m http.server 3000

