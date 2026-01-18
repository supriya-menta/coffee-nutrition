# Coffee Leaf Nutrition Prediction - Run Commands

## Prerequisites

1. **Python 3.8+** installed
2. **Dependencies installed:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Project

### Backend Server (Flask API)

**Step 1: Navigate to backend directory**
```bash
cd backend
```

**Step 2: Install backend dependencies (if not already installed)**
```bash
pip install -r requirements.txt
```

**Step 3: Start the backend server**
```bash
python app.py
```

**Expected Output:**
```
Initializing Coffee Leaf Nutrition Prediction API...
Loading model...
Loading model from: model\weights.hdf5
Model loaded successfully!
Model loaded and ready!
Starting Flask server on http://localhost:5000
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://[your-ip]:5000
```

**Backend will be available at:** http://localhost:5000

**Test backend health:**
```bash
# Windows PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health

# Linux/Mac
curl http://localhost:5000/health
```

---

### Frontend Server (Static HTML)

**Step 1: Open a NEW terminal window** (keep backend running in first terminal)

**Step 2: Navigate to frontend public directory**
```bash
cd frontend/public
```

**Step 3: Start the frontend server**
```bash
# Windows
python -m http.server 3000

# Linux/Mac
python3 -m http.server 3000
```

**Expected Output:**
```
Serving HTTP on :: port 3000 (http://[::]:3000/) ...
Serving HTTP on 0.0.0.0 port 3000 (http://0.0.0.0:3000/) ...
```

**Frontend will be available at:** http://localhost:3000

---

## Quick Start (Using Shell Scripts)

### Linux/Mac:

**Start Backend:**
```bash
chmod +x run_backend.sh
./run_backend.sh
```

**Start Frontend (in new terminal):**
```bash
chmod +x run_frontend.sh
./run_frontend.sh
```

**Start Both (in separate windows):**
```bash
chmod +x run_all.sh
./run_all.sh
```

---

## Access Points

- **Frontend UI:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/health
- **API Home:** http://localhost:5000/

---

## Testing the Application

### 1. Test Backend Health
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health

# Should return: {"status":"healthy","model_loaded":true}
```

### 2. Test Model Loading
```bash
python test_model.py
```

### 3. Test Frontend
1. Open browser: http://localhost:3000
2. Upload a coffee leaf image (PNG, JPEG, JPG)
3. Click "Analyze Leaf"
4. View prediction results

---

## Troubleshooting

### Port Already in Use

**Backend (port 5000):**
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

**Frontend (port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### Model File Not Found
- Ensure `backend/model/weights.hdf5` exists (~97MB)
- Check file path in error message

### Dependencies Missing
```bash
pip install -r requirements.txt
cd backend
pip install -r requirements.txt
```

---

## Complete Workflow

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend/public
python -m http.server 3000
```

**Browser:**
- Open http://localhost:3000
- Upload image and test!


