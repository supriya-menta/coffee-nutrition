

## Deployment Guide for Vercel

### Project Structure

```
Coffee Plant Nutrition Prediction/
├── frontend/                 # Deploy this folder to Vercel
│   ├── public/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   ├── vercel.json
│   └── package.json
│
├── backend/                  # Deploy separately or use external hosting
│   ├── api/
│   ├── model/
│   │   └── weights.hdf5 (97MB)
│   ├── app.py
│   └── requirements.txt
│
└── model_metrics/
    └── metrics.json          # Model performance data
```

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

The frontend is already configured in the `frontend/` directory with:
- ✅ Static HTML, CSS, JavaScript
- ✅ Model metrics display (92.45% accuracy)
- ✅ Vercel configuration (`vercel.json`)
- ✅ Package.json for deployment

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**

```bash


# Navigate to frontend directory
cd frontend


### Step 3: Configure Environment Variables


## Backend Deployment Options

### ⚠️ Important: Model Size Issue

Your `weights.hdf5` file is **97MB**, which exceeds Vercel's 50MB serverless function limit.




## Local Testing

### Frontend Only

```bash
cd frontend
python server.py 8000
# Open http://localhost:8000/public/index.html
```

### With Backend

**Terminal 1 (Backend):**
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
python server.py 8000
# Open http://localhost:8000/public/index.html
```

---

## Model Metrics

The application displays real-time model performance metrics:

- **Overall Accuracy**: 92.45%
- **Precision**: 91.87%
- **Recall**: 91.56%
- **F1-Score**: 91.71%

Per-class performance:
- **Healthy**: 94.94% F1-score
- **N Deficiency**: 89.84% F1-score
- **P Deficiency**: 90.54% F1-score
- **K Deficiency**: 91.52% F1-score

Metrics are loaded from `model_metrics/metrics.json` and displayed automatically on page load.

---

## File Locations

### Frontend Files
- `frontend/public/index.html` - Main HTML file
- `frontend/public/styles.css` - All styles including metrics
- `frontend/public/script.js` - JavaScript with metrics loading
- `frontend/vercel.json` - Vercel configuration
- `frontend/package.json` - Package configuration

### Backend Files
- `backend/app.py` - Flask API server
- `backend/model/weights.hdf5` - Trained model (97MB)
- `backend/requirements.txt` - Python dependencies

### Model Data
- `model_metrics/metrics.json` - Performance metrics

---

## Troubleshooting

### Frontend shows "Analysis failed"
- Backend is not running or URL is incorrect
- Check `script.js` line 327 for correct API endpoint
- Verify CORS is enabled on backend

### Metrics not displaying
- Check browser console for errors
- Verify `model_metrics/metrics.json` path is correct
- Ensure JSON file is accessible

### Model file too large for Vercel
- Use external backend hosting (Railway, Render, Heroku)
- Or use cloud storage (S3, Google Cloud Storage) for model file

---

## Next Steps

1. ✅ Frontend is ready to deploy to Vercel
2. ⚠️ Deploy backend to Railway/Render/Heroku
3. ⚠️ Update frontend API endpoint with backend URL
4. ✅ Metrics will load automatically
5. 🚀 Test end-to-end functionality

---

## Support

For issues or questions:
- Check browser console for errors
- Verify all environment variables are set
- Ensure backend is running and accessible
- Test API endpoint directly: `curl YOUR_BACKEND_URL/health`
