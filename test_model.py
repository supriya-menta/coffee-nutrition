import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

print("Step 1: Importing libraries...")
try:
    import tensorflow as tf
    print(f"✓ TensorFlow version: {tf.__version__}")
except Exception as e:
    print(f"✗ TensorFlow import failed: {e}")
    exit(1)

try:
    from tensorflow import keras
    print(f"✓ Keras imported successfully")
except Exception as e:
    print(f"✗ Keras import failed: {e}")
    exit(1)

try:
    import sklearn
    print(f"✓ scikit-learn version: {sklearn.__version__}")
except Exception as e:
    print(f"✗ scikit-learn import failed: {e}")
    exit(1)

print("\nStep 2: Loading model...")
try:
    model = keras.models.load_model('weights.hdf5', compile=False)
    print("✓ Model loaded successfully (without compilation)!")
    print(f"  Model input shape: {model.input_shape}")
    print(f"  Model output shape: {model.output_shape}")
except Exception as e:
    print(f"✗ Model loading failed: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\nStep 3: Testing prediction...")
try:
    import numpy as np
    test_input = np.random.rand(1, 224, 224, 3).astype(np.float32)
    prediction = model.predict(test_input, verbose=0)
    print(f"✓ Prediction successful!")
    print(f"  Output shape: {prediction.shape}")
    print(f"  Predicted class: {prediction.argmax()}")
    print(f"  Confidence: {prediction.max():.4f}")
except Exception as e:
    print(f"✗ Prediction failed: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\n✅ All tests passed! Model is working correctly.")
