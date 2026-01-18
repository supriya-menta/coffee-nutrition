import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

print("Step 1: Importing libraries...")
try:
    import tensorflow as tf
    print(f"[OK] TensorFlow version: {tf.__version__}")
except Exception as e:
    print(f"[ERROR] TensorFlow import failed: {e}")
    exit(1)

try:
    from tensorflow import keras
    print(f"[OK] Keras imported successfully")
except Exception as e:
    print(f"[ERROR] Keras import failed: {e}")
    exit(1)

try:
    import sklearn
    print(f"[OK] scikit-learn version: {sklearn.__version__}")
except Exception as e:
    print(f"[ERROR] scikit-learn import failed: {e}")
    exit(1)

print("\nStep 2: Loading model...")
try:
    # Try multiple model paths
    import os
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
    model = keras.models.load_model(model_path, compile=False)
    print("[OK] Model loaded successfully (without compilation)!")
    print(f"  Model input shape: {model.input_shape}")
    print(f"  Model output shape: {model.output_shape}")
except Exception as e:
    print(f"[ERROR] Model loading failed: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\nStep 3: Testing prediction...")
try:
    import numpy as np
    test_input = np.random.rand(1, 224, 224, 3).astype(np.float32)
    prediction = model.predict(test_input, verbose=0)
    print(f"[OK] Prediction successful!")
    print(f"  Output shape: {prediction.shape}")
    print(f"  Predicted class: {prediction.argmax()}")
    print(f"  Confidence: {prediction.max():.4f}")
except Exception as e:
    print(f"[ERROR] Prediction failed: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\n[SUCCESS] All tests passed! Model is working correctly.")
