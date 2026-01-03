import os
import io
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

# Initialize Flask app
app = Flask(__name__)

# 1. Exact CORS origin matching as requested
CORS(app, origins=["https://coffee-nutrition.vercel.app"])

# Absolute path to model.h5 in the backend directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.h5')

# Model and labels
model = None
# Labels based on the user's specific requirement order and model architecture
LABELS = ["P_Deficiency", "Healthy", "N_Deficiency", "K_Deficiency"]

def get_model():
    """Load model with absolute path and compile=False for stability"""
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            print(f"ERROR: Model file not found at {MODEL_PATH}")
            return None
        try:
            print(f"Loading model from {MODEL_PATH}...")
            model = load_model(MODEL_PATH, compile=False)
            print("Model loaded successfully!")
        except Exception as e:
            print(f"CRITICAL ERROR: {str(e)}")
            model = None
    return model

@app.route("/predict", methods=["POST"])
def predict():
    """/predict route with exact requirements"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Load model
        ml_model = get_model()
        if ml_model is None:
            return jsonify({"error": "Model not available"}), 500

        # Image processing: Resize to 224x224 and Normalize by 255.0
        img = Image.open(file)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img = img.resize((224, 224))
        
        img_array = image.img_to_array(img)
        # Normalize as requested: img_array / 255.0
        img_array = np.expand_dims(img_array / 255.0, axis=0)

        # Make prediction
        predictions = ml_model.predict(img_array)
        pred_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))

        # Return JSON in the requested format
        return jsonify({
            "prediction": LABELS[pred_index],
            "confidence": round(confidence, 4)
        }), 200

    except Exception as e:
        print(f"Prediction Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    ml_model = get_model()
    return jsonify({
        "status": "healthy" if ml_model else "unhealthy",
        "model_loaded": ml_model is not None
    }), 200

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Coffee Leaf Nutrition Prediction API",
        "cors_origin": "https://coffee-nutrition.vercel.app"
    }), 200

# Production-ready gunicorn binding check
if __name__ == "__main__":
    get_model()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
