import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from tensorflow.keras.preprocessing import image
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Global variable to store the model pipeline
model_pipeline = None

def load_model_pipeline():
    """Load the trained model and create prediction pipeline"""
    global model_pipeline
    
    if model_pipeline is not None:
        return model_pipeline
    
    print("Loading model...")
    # Try multiple model paths
    model_paths = [
        'weights.hdf5',
        os.path.join('backend', 'model', 'weights.hdf5'),
        os.path.join(os.path.dirname(__file__), 'weights.hdf5'),
        os.path.join(os.path.dirname(__file__), 'backend', 'model', 'weights.hdf5')
    ]
    
    model_path = None
    for path in model_paths:
        if os.path.exists(path):
            model_path = path
            break
    
    if model_path is None:
        raise FileNotFoundError(f"Model file not found. Tried: {model_paths}")
    
    print(f"Loading model from: {model_path}")
    lr = keras.models.load_model(model_path, compile=False)
    print("Model loaded successfully!")
    
    # Prediction Pipeline
    class Preprocessor(BaseEstimator, TransformerMixin):
        def fit(self, img_object):
            return self
        
        def transform(self, img_object):
            img_array = image.img_to_array(img_object)
            expanded = np.expand_dims(img_array, axis=0)
            return expanded
    
    class Predictor(BaseEstimator, TransformerMixin):
        def __init__(self, model):
            self.model = model
        
        def fit(self, img_array):
            return self
        
        def predict(self, img_array):
            probabilities = self.model.predict(img_array)
            class_names = ['P_Deficiency', 'Healthy', 'N_Deficiency', 'K_Deficiency']
            predicted_class = class_names[probabilities.argmax()]
            confidence = float(probabilities.max())
            
            return {
                'prediction': predicted_class,
                'confidence': confidence,
                'probabilities': {
                    class_names[i]: float(probabilities[0][i]) 
                    for i in range(len(class_names))
                }
            }
    
    model_pipeline = Pipeline([
        ('preprocessor', Preprocessor()),
        ('predictor', Predictor(lr))
    ])
    
    return model_pipeline

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint to predict nutrient deficiency from uploaded image"""
    try:
        # Check if image file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Read and process the image
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to model input size
        img = img.resize((224, 224))
        
        # Load model pipeline
        pipeline = load_model_pipeline()
        
        # Make prediction
        result = pipeline.predict(img)
        
        return jsonify(result), 200
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'model_loaded': model_pipeline is not None}), 200

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Coffee Leaf Nutrition Prediction API',
        'version': '1.0',
        'endpoints': {
            '/predict': 'POST - Upload image for prediction',
            '/health': 'GET - Check API health status'
        }
    }), 200

if __name__ == '__main__':
    # Pre-load the model
    print("Initializing Coffee Leaf Nutrition Prediction API...")
    load_model_pipeline()
    print("Model loaded and ready!")
    
    # Run the Flask app
    print("Starting Flask server on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
