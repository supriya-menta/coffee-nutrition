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

# 1. Enable CORS for specifically the Vercel frontend and common origins
# This ensures development and production both work
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://coffee-nutrition.vercel.app",
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ]
    }
})

# Global variables for model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.h5')
CLASS_NAMES = ['P_Deficiency', 'Healthy', 'N_Deficiency', 'K_Deficiency']
model = None

def get_model():
    """Load model once and reuse"""
    global model
    if model is None:
        print(f"Loading model from {MODEL_PATH}...")
        try:
            # compile=False is safer for deployment with different TF versions
            model = load_model(MODEL_PATH, compile=False)
            print("Model loaded successfully!")
        except Exception as e:
            print(f"CRITICAL ERROR: Failed to load model: {str(e)}")
            model = None
    return model

# 2. Implement the /predict route
@app.route('/predict', methods=['POST'])
def predict():
    """
    Accepts an image file with key 'file',
    makes a prediction using the TensorFlow model,
    and returns JSON.
    """
    try:
        # 3. Include proper error handling for missing files
        if 'file' not in request.files:
            return jsonify({
                "error": "No file part",
                "message": "Please upload an image with the key 'file'"
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                "error": "No selected file",
                "message": "No file was uploaded"
            }), 400

        # Read the image
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        
        # Preprocess the image (Standard for many leaf models)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img = img.resize((224, 224))
        
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) # Add batch dimension
        # Normalize if your model requires it (common for TF/Keras)
        # img_array = img_array / 255.0 

        # Load model and predict
        ml_model = get_model()
        if ml_model is None:
            return jsonify({"error": "Model initialization failed"}), 500

        predictions = ml_model.predict(img_array)
        
        # Get result
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))
        prediction_label = CLASS_NAMES[predicted_class_idx]

        # 2. Return JSON in the requested format
        return jsonify({
            "prediction": prediction_label,
            "confidence": round(confidence, 4)
        }), 200

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({
            "error": "Prediction error",
            "message": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model_loaded": model is not None}), 200

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "message": "Coffee Leaf Nutrition Prediction API",
        "status": "Running",
        "endpoints": ["/predict (POST)", "/health (GET)"]
    }), 200

# 4. Production-ready setup
if __name__ == '__main__':
    # Pre-warm the model
    get_model()
    # For local testing
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
