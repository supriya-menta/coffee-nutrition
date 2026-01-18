#!/bin/bash

echo "========================================"
echo "Starting Coffee Leaf Nutrition Prediction Backend Server"
echo "========================================"
echo ""

cd backend

if [ ! -f "model/weights.hdf5" ]; then
    echo "ERROR: Model file not found at backend/model/weights.hdf5"
    echo "Please ensure the model file exists."
    exit 1
fi

echo "Installing/updating dependencies..."
pip install -r requirements.txt

echo ""
echo "Starting Flask server..."
echo "Backend will be available at: http://localhost:5000"
echo ""
python app.py

