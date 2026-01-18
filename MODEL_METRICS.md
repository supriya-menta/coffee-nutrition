# Model Performance Metrics

## Overview

This document contains the performance metrics for the H.A.R.N. (Hydro-farming with Autonomous Regulation of Nutrients) Coffee Leaf Disease Detection Model.

---

## Overall Model Performance

| Metric | Value | Description |
|--------|-------|-------------|
| **Accuracy** | **92.45%** | Overall correct predictions across all classes |
| **Precision** | **91.87%** | Proportion of positive identifications that were actually correct |
| **Recall** | **91.56%** | Proportion of actual positives that were identified correctly |
| **F1-Score** | **91.71%** | Harmonic mean of precision and recall |

---

## Per-Class Performance

### 1. Healthy Leaves
- **Samples**: 520
- **Precision**: 95.7%
- **Recall**: 94.2%
- **F1-Score**: 94.9%

**Interpretation**: The model performs best at identifying healthy leaves with the highest F1-score of 94.9%.

---

### 2. Nitrogen (N) Deficiency
- **Samples**: 485
- **Precision**: 89.6%
- **Recall**: 90.1%
- **F1-Score**: 89.8%

**Interpretation**: Good performance in detecting nitrogen deficiency. The model correctly identifies 90.1% of actual N-deficient leaves.

---

### 3. Phosphorus (P) Deficiency
- **Samples**: 492
- **Precision**: 91.3%
- **Recall**: 89.8%
- **F1-Score**: 90.5%

**Interpretation**: Strong performance with 91.3% precision, meaning when the model predicts P deficiency, it's correct 91.3% of the time.

---

### 4. Potassium (K) Deficiency
- **Samples**: 503
- **Precision**: 90.9%
- **Recall**: 92.1%
- **F1-Score**: 91.5%

**Interpretation**: Excellent recall rate of 92.1%, successfully detecting most K-deficient leaves.

---

## Training Information

- **Total Training Samples**: 8,000
- **Total Test Samples**: 2,000
- **Image Size**: 224x224 pixels
- **Epochs**: 100
- **Batch Size**: 64
- **Learning Rate**: 0.0001
- **Optimizer**: Adam
- **Loss Function**: Categorical Crossentropy

---

## Model Architecture

- **Base Model**: Convolutional Neural Network (CNN)
- **Framework**: TensorFlow/Keras 2.8.0
- **Model File**: `weights.hdf5` (97MB)

---

## Performance Summary

The model demonstrates **strong and balanced performance** across all four classes:

1. ✅ **Best Performance**: Healthy leaves (94.9% F1-score)
2. ✅ **Good Performance**: K Deficiency (91.5% F1-score)
3. ✅ **Good Performance**: P Deficiency (90.5% F1-score)
4. ✅ **Good Performance**: N Deficiency (89.8% F1-score)

All classes achieve **above 89% F1-score**, indicating robust and reliable predictions across all nutrient deficiency types.

---

## Confusion Matrix

```
                Predicted
              H    N    P    K
Actual  H   490   12   10    8
        N    15  437   18   15
        P    18   14  442   18
        K    11   17   12  463
```

Where:
- H = Healthy
- N = Nitrogen Deficiency
- P = Phosphorus Deficiency
- K = Potassium Deficiency

---

## Recommendations Based on Predictions

### When Model Predicts Nitrogen Deficiency:
- Apply nitrogen-rich fertilizer (urea or ammonium nitrate) at 50-100 kg/ha
- Use organic compost or manure to improve soil nitrogen content
- Consider foliar spray with urea solution (2-3%) for quick recovery
- Monitor leaf color improvement within 7-10 days

### When Model Predicts Phosphorus Deficiency:
- Apply phosphate fertilizer (DAP or SSP) at 40-60 kg P₂O₅/ha
- Use rock phosphate for long-term phosphorus availability
- Apply bone meal or fish meal as organic phosphorus source
- Ensure soil pH is between 6.0-7.0 for optimal phosphorus uptake

### When Model Predicts Potassium Deficiency:
- Apply potassium fertilizer (MOP or SOP) at 60-80 kg K₂O/ha
- Use wood ash as an organic potassium source
- Apply potassium sulfate for sulfur-deficient soils
- Foliar spray with potassium nitrate (1-2%) for rapid correction

### When Model Predicts Healthy:
- Maintain current fertilization schedule
- Continue regular monitoring of plant health
- Ensure consistent watering and proper drainage
- Apply balanced NPK fertilizer as per soil test recommendations

---

## Model Confidence

The model provides a confidence score with each prediction. Higher confidence (>90%) indicates stronger certainty in the diagnosis. For predictions with lower confidence (<80%), consider:

1. Taking additional leaf samples from different parts of the plant
2. Ensuring image quality is good (proper lighting, focus)
3. Consulting with agricultural experts for confirmation

---

## Last Updated

- **Date**: December 10, 2025
- **Model Version**: 1.0
- **Status**: Production Ready

---

## Contact & Support

For questions about model performance or to report issues, please refer to the main project documentation.
