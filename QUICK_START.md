# Coffee Leaf Nutrition Prediction - Quick Start Guide

## ✅ All .bat Files Removed
All Windows batch files have been removed. Use the commands below or shell scripts for Linux/Mac.

## ✅ Project Renamed
Project has been renamed from "H.A.R.N." to "Coffee Leaf Nutrition Prediction"

---

## 🚀 How to Run the Project

### **Backend Server (Required First)**

**Step 1:** Open Terminal/PowerShell and navigate to backend:
```bash
cd backend
```

**Step 2:** Install dependencies (first time only):
```bash
pip install -r requirements.txt
```

**Step 3:** Start backend server:
```bash
python app.py
```

**✅ Backend is running when you see:**
```
Model loaded and ready!
Starting Flask server on http://localhost:5000
 * Running on http://127.0.0.1:5000
```

**Backend URL:** http://localhost:5000

---

### **Frontend Server (Open in New Terminal)**

**Step 1:** Open a **NEW** Terminal/PowerShell window (keep backend running)

**Step 2:** Navigate to frontend:
```bash
cd frontend/public
```

**Step 3:** Start frontend server:
```bash
# Windows
python -m http.server 3000

# Linux/Mac
python3 -m http.server 3000
```

**✅ Frontend is running when you see:**
```
Serving HTTP on 0.0.0.0 port 3000
```

**Frontend URL:** http://localhost:3000

---

## 🌐 Access the Website

1. **Open your web browser**
2. **Go to:** http://localhost:3000
3. **Upload a coffee leaf image** (PNG, JPEG, JPG)
4. **Click "Analyze Leaf"**
5. **View results!**

---

## ✅ Test Endpoints

### Backend Health Check:
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health

# Linux/Mac
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Backend Home:
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost:5000/

# Linux/Mac
curl http://localhost:5000/
```

---

## 📋 Complete Command Summary

### Terminal 1 - Backend:
```bash
cd backend
python app.py
```

### Terminal 2 - Frontend:
```bash
cd frontend/public
python -m http.server 3000
```

### Browser:
- Open: **http://localhost:3000**

---

## 🔍 Verify Everything is Working

### ✅ Backend Test:
```bash
python test_model.py
```
Should show: `[SUCCESS] All tests passed!`

### ✅ Backend API Test:
```bash
Invoke-WebRequest -Uri http://localhost:5000/health
```
Should return: `{"status":"healthy","model_loaded":true}`

### ✅ Frontend Test:
- Open browser: http://localhost:3000
- Page should load with upload interface
- No console errors

---

## ⚠️ Troubleshooting

**Port 5000 already in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Port 3000 already in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Model not found:**
- Check `backend/model/weights.hdf5` exists (~97MB)

**Dependencies missing:**
```bash
pip install -r requirements.txt
cd backend
pip install -r requirements.txt
```

---

## 📝 Notes

- Backend takes ~5-10 seconds to load model on startup
- Keep both terminals open while using the application
- First prediction may be slower as model initializes
- Supported image formats: PNG, JPEG, JPG (max 10MB)


