# H.A.R.N. - Coffee Leaf Disease Detection

## Deployment Guide for Vercel

### Project Structure

```
HARN/
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
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow prompts to link to your Vercel account
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set root directory to `frontend`
5. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel dashboard, add:
- `API_ENDPOINT`: Your backend API URL (see backend deployment below)

---

## Backend Deployment Options

### ⚠️ Important: Model Size Issue

Your `weights.hdf5` file is **97MB**, which exceeds Vercel's 50MB serverless function limit.

### Recommended Solution: External Backend Hosting

**Option 1: Railway (Recommended)**

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Select `backend` directory as root
4. Railway will auto-detect Python and install dependencies
5. Set environment variables if needed
6. Deploy!

**Option 2: Render**

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Set root directory to `backend`
5. Build command: `pip install -r requirements.txt`
6. Start command: `python app.py`
7. Deploy!

**Option 3: Heroku**

```bash
# In backend directory
heroku create your-app-name
git subtree push --prefix backend heroku main
```

### After Backend Deployment

1. Copy your backend URL (e.g., `https://your-app.railway.app`)
2. Update frontend `script.js` line 327:
   ```javascript
   const response = await fetch('YOUR_BACKEND_URL/predict', {
   ```
3. Redeploy frontend to Vercel

---

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
