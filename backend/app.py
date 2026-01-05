import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Minimize TF logging
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0' # Stability on some cloud envs
import io
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

# Configure TensorFlow for better performance on limited resources
try:
    gpus = tf.config.experimental.list_physical_devices('GPU')
    if gpus:
        try:
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
        except RuntimeError as e:
            print(f"GPU memory growth setting error: {e}", flush=True)
except:
    pass  # No GPU available, continue with CPU

# Limit TensorFlow CPU threads for better resource management
tf.config.threading.set_intra_op_parallelism_threads(2)
tf.config.threading.set_inter_op_parallelism_threads(2)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all origins (more flexible for deployment)
# You can restrict this to specific origins in production if needed
CORS(app, resources={
    r"/*": {
        "origins": ["*"],  # Allow all origins - update to specific domain in production if needed
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": False
    }
})

# Absolute path to model.h5 in the backend directory
# We use absolute path to avoid issues with different working directories on Render
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, 'model.h5')

# Model and labels
model = None
LABELS = ["P_Deficiency", "Healthy", "N_Deficiency", "K_Deficiency"]

def get_model():
    """Load model with absolute path and compile=False for stability"""
    global model
    if model is None:
        print(f"DEBUG: Checking for model at {MODEL_PATH}", flush=True)
        if not os.path.exists(MODEL_PATH):
            print(f"ERROR: Model file not found at {MODEL_PATH}", flush=True)
            # Try searching in current directory just in case
            alt_path = os.path.join(os.getcwd(), 'model.h5')
            print(f"DEBUG: Checking alternative path: {alt_path}", flush=True)
            if os.path.exists(alt_path):
                print(f"DEBUG: Found model at {alt_path}", flush=True)
                target_path = alt_path
            else:
                return None
        else:
            target_path = MODEL_PATH

        try:
            print(f"DEBUG: Loading model from {target_path}...", flush=True)
            # Use h5py for loading if possible, or direct load_model
            model = load_model(target_path, compile=False)
            print("SUCCESS: Model loaded successfully!", flush=True)
        except Exception as e:
            print(f"CRITICAL ERROR loading model: {str(e)}", flush=True)
            import traceback
            traceback.print_exc()
            model = None
    return model

@app.route("/predict", methods=["POST"])
def predict():
    """/predict route with exact requirements"""
    print("DEBUG: Received prediction request", flush=True)
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Load model
        print("DEBUG: Getting model...", flush=True)
        ml_model = get_model()
        if ml_model is None:
            return jsonify({"error": "Model not available"}), 500
        print("DEBUG: Model loaded successfully", flush=True)

        # Image processing: Resize to 224x224 and Normalize by 255.0
        print("DEBUG: Processing image...", flush=True)
        img = Image.open(file)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img = img.resize((224, 224))
        
        img_array = image.img_to_array(img)
        # Normalize as requested: img_array / 255.0
        img_array = np.expand_dims(img_array / 255.0, axis=0)
        print("DEBUG: Image processed, shape:", img_array.shape, flush=True)

        # Make prediction with verbose=0 to reduce overhead
        # Use batch_size=1 and steps=1 for faster inference
        print("DEBUG: Starting prediction...", flush=True)
        import time
        start_time = time.time()
        predictions = ml_model.predict(img_array, verbose=0, batch_size=1)
        elapsed_time = time.time() - start_time
        print(f"DEBUG: Prediction completed in {elapsed_time:.2f} seconds", flush=True)
        
        pred_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))
        print(f"DEBUG: Prediction result: {LABELS[pred_index]} ({confidence:.4f})", flush=True)

        # Return JSON in the requested format
        return jsonify({
            "prediction": LABELS[pred_index],
            "confidence": round(confidence, 4)
        }), 200

    except Exception as e:
        print(f"Prediction Error: {str(e)}", flush=True)
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    ml_model = get_model()
    return jsonify({
        "status": "healthy" if ml_model else "unhealthy",
        "model_loaded": ml_model is not None,
        "search_path": MODEL_PATH,
        "cwd": os.getcwd(),
        "exists": os.path.exists(MODEL_PATH)
    }), 200

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Coffee Leaf Nutrition Prediction API",
        "status": "running",
        "endpoints": {
            "/predict": "POST - Upload image for prediction",
            "/health": "GET - Check API health status"
        }
    }), 200

# Pre-warm the model at the top level so it loads on Gunicorn start
# This allows us to see loading errors immediately in the logs
print("=== INITIALIZING MODEL ON STARTUP ===", flush=True)
warmup_model = get_model()

# Warm up the model with a dummy prediction to compile the TensorFlow graph
# This makes the first real prediction much faster (avoids 30-60s compilation delay)
if warmup_model is not None:
    try:
        print("=== WARMING UP MODEL (compiling TensorFlow graph) ===", flush=True)
        dummy_input = np.zeros((1, 224, 224, 3), dtype=np.float32)
        _ = warmup_model.predict(dummy_input, verbose=0)
        print("=== MODEL WARMUP COMPLETE ===", flush=True)
    except Exception as e:
        print(f"WARNING: Model warmup failed (this is okay, first prediction will be slower): {str(e)}", flush=True)

# Production-ready gunicorn binding check
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
