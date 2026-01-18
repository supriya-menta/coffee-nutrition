# H.A.R.N. Project Setup and Run Guide

## Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   
   Or for backend only:
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

### Running the Project

#### Option 1: Run Everything (Recommended)

**Windows:**
```bash
run_all.bat
```

**Linux/Mac:**
```bash
chmod +x run_all.sh
./run_all.sh
```

This will start both backend and frontend servers automatically.

#### Option 2: Run Separately

**Backend Server (Flask API):**

Windows:
```bash
run_backend.bat
```

Linux/Mac:
```bash
chmod +x run_backend.sh
./run_backend.sh
```

**Frontend Server (Static HTML):**

Windows:
```bash
run_frontend.bat
```

Linux/Mac:
```bash
chmod +x run_frontend.sh
./run_frontend.sh
```

#### Option 3: Manual Commands

**Backend:**
```bash
cd backend
python app.py
```

**Frontend:**
```bash
cd frontend/public
python -m http.server 3000
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/health

### Project Structure

```
HARN/
├── backend/
│   ├── app.py              # Flask API server
│   ├── model/
│   │   └── weights.hdf5    # Trained model (97MB)
│   └── requirements.txt    # Backend dependencies
├── frontend/
│   └── public/
│       ├── index.html      # Frontend UI
│       ├── script.js       # Frontend logic
│       └── styles.css      # UI styling
├── run_backend.bat/sh      # Backend startup script
├── run_frontend.bat/sh     # Frontend startup script
├── run_all.bat/sh          # Start both servers
└── requirements.txt        # Root dependencies
```

### Troubleshooting

1. **Model file not found:**
   - Ensure `backend/model/weights.hdf5` exists
   - The model file is ~97MB, make sure it's downloaded

2. **Port already in use:**
   - Backend uses port 5000, frontend uses port 3000
   - Change ports in the respective files if needed

3. **Import errors:**
   - Make sure all dependencies are installed: `pip install -r requirements.txt`
   - Use Python 3.8 or higher

4. **CORS errors:**
   - Backend has CORS enabled, but ensure frontend URL matches backend expectations

### Testing

Test the backend API:
```bash
curl http://localhost:5000/health
```

Test model loading:
```bash
python test_model.py
```

### Notes

- The backend loads the model on startup (may take a few seconds)
- Model file is large (~97MB), ensure sufficient disk space
- First prediction may be slower as model initializes


