apiEndpoint: 'https://coffee-leaf-api.onrender.com/predict', // Update this with your actual API endpoint

// ===== Nutrient Information Database =====
const NUTRIENT_INFO = {
    'N_Deficiency': {
        diagnosis: 'Nitrogen Deficiency Detected',
        icon: '🍃',
        causes: [
            'Poor soil fertility or depleted nitrogen reserves',
            'Excessive rainfall causing nitrogen leaching',
            'Sandy soils with low organic matter content',
            'Inadequate fertilization or improper timing',
            'High crop density competing for available nitrogen'
        ],
        prevention: [
            'Regular soil testing to monitor nitrogen levels',
            'Apply organic matter (compost, manure) annually',
            'Use slow-release nitrogen fertilizers',
            'Practice proper crop rotation with legumes',
            'Maintain optimal soil pH (6.0-6.5) for nutrient availability'
        ],
        nutrients: {
            nitrogen: {
                name: 'Nitrogen (N)',
                symbol: 'N',
                status: 'needed',
                description: 'Critical macronutrient needed immediately. Nitrogen is essential for leaf growth and chlorophyll production.'
            },
            phosphorus: {
                name: 'Phosphorus (P)',
                symbol: 'P',
                status: 'sufficient',
                description: 'Maintain current levels through regular fertilization schedule.'
            },
            potassium: {
                name: 'Potassium (K)',
                symbol: 'K',
                status: 'sufficient',
                description: 'Adequate levels detected. Continue monitoring.'
            },
            boron: {
                name: 'Boron (B)',
                symbol: 'B',
                status: 'sufficient',
                description: 'Micronutrient levels are within acceptable range.'
            }
        },
        treatment: [
            'Apply nitrogen-rich fertilizer (urea or ammonium nitrate) at 50-100 kg/ha',
            'Use organic compost or manure to improve soil nitrogen content',
            'Consider foliar spray with urea solution (2-3%) for quick recovery',
            'Monitor leaf color improvement within 7-10 days',
            'Implement crop rotation with nitrogen-fixing legumes'
        ]
    },
    'P_Deficiency': {
        diagnosis: 'Phosphorus Deficiency Detected',
        icon: '🌿',
        causes: [
            'Acidic or alkaline soil pH limiting phosphorus availability',
            'Cold soil temperatures reducing phosphorus uptake',
            'High iron or aluminum content binding phosphorus',
            'Compacted soil restricting root development',
            'Low organic matter content in soil'
        ],
        prevention: [
            'Maintain soil pH between 6.0-7.0 for optimal availability',
            'Add organic matter to improve soil structure',
            'Avoid over-liming which can reduce phosphorus availability',
            'Use mycorrhizal fungi to enhance phosphorus uptake',
            'Apply phosphorus fertilizers at planting time'
        ],
        nutrients: {
            nitrogen: {
                name: 'Nitrogen (N)',
                symbol: 'N',
                status: 'sufficient',
                description: 'Current nitrogen levels are adequate.'
            },
            phosphorus: {
                name: 'Phosphorus (P)',
                symbol: 'P',
                status: 'needed',
                description: 'Critical deficiency detected. Phosphorus is vital for root development and energy transfer.'
            },
            potassium: {
                name: 'Potassium (K)',
                symbol: 'K',
                status: 'sufficient',
                description: 'Potassium levels are within normal range.'
            },
            boron: {
                name: 'Boron (B)',
                symbol: 'B',
                status: 'sufficient',
                description: 'Micronutrient levels are acceptable.'
            }
        },
        treatment: [
            'Apply phosphate fertilizer (DAP or SSP) at 40-60 kg P₂O₅/ha',
            'Use rock phosphate for long-term phosphorus availability',
            'Apply bone meal or fish meal as organic phosphorus source',
            'Ensure soil pH is between 6.0-7.0 for optimal phosphorus uptake',
            'Consider mycorrhizal inoculation to improve phosphorus absorption'
        ]
    },
    'K_Deficiency': {
        diagnosis: 'Potassium Deficiency Detected',
        icon: '🌾',
        causes: [
            'Sandy or light-textured soils with low potassium retention',
            'Excessive rainfall or irrigation causing leaching',
            'High magnesium or calcium levels competing with potassium',
            'Continuous cropping without adequate fertilization',
            'Poor drainage leading to potassium loss'
        ],
        prevention: [
            'Apply potassium-rich fertilizers before heavy rainfall',
            'Use mulching to reduce leaching losses',
            'Maintain balanced fertilization (NPK ratio)',
            'Improve soil structure with organic matter',
            'Monitor and adjust irrigation to prevent excessive leaching'
        ],
        nutrients: {
            nitrogen: {
                name: 'Nitrogen (N)',
                symbol: 'N',
                status: 'sufficient',
                description: 'Nitrogen levels are within acceptable range.'
            },
            phosphorus: {
                name: 'Phosphorus (P)',
                symbol: 'P',
                status: 'sufficient',
                description: 'Phosphorus levels are adequate.'
            },
            potassium: {
                name: 'Potassium (K)',
                symbol: 'K',
                status: 'needed',
                description: 'Severe deficiency detected. Potassium is crucial for disease resistance and fruit quality.'
            },
            boron: {
                name: 'Boron (B)',
                symbol: 'B',
                status: 'sufficient',
                description: 'Boron levels are satisfactory.'
            }
        },
        treatment: [
            'Apply potassium fertilizer (MOP or SOP) at 60-80 kg K₂O/ha',
            'Use wood ash as an organic potassium source',
            'Apply potassium sulfate for sulfur-deficient soils',
            'Foliar spray with potassium nitrate (1-2%) for rapid correction',
            'Improve soil drainage to prevent potassium leaching'
        ]
    },
    'Healthy': {
        diagnosis: 'Healthy Leaf - No Deficiency',
        icon: '✅',
        causes: [],
        prevention: [
            'Continue current nutrient management practices',
            'Regular soil testing every 6-12 months',
            'Maintain consistent watering schedule',
            'Monitor plant health for early detection of issues',
            'Keep records of fertilization and crop performance'
        ],
        nutrients: {
            nitrogen: {
                name: 'Nitrogen (N)',
                symbol: 'N',
                status: 'sufficient',
                description: 'Optimal nitrogen levels detected. Continue current fertilization.'
            },
            phosphorus: {
                name: 'Phosphorus (P)',
                symbol: 'P',
                status: 'sufficient',
                description: 'Phosphorus levels are excellent.'
            },
            potassium: {
                name: 'Potassium (K)',
                symbol: 'K',
                status: 'sufficient',
                description: 'Potassium levels are optimal.'
            },
            boron: {
                name: 'Boron (B)',
                symbol: 'B',
                status: 'sufficient',
                description: 'All micronutrients are well-balanced.'
            }
        },
        treatment: [
            'Maintain current fertilization schedule',
            'Continue regular monitoring of plant health',
            'Ensure consistent watering and proper drainage',
            'Monitor for early signs of pest or disease',
            'Apply balanced NPK fertilizer as per soil test recommendations'
        ]
    }
};

// ===== DOM Elements =====
const elements = {
    uploadArea: document.getElementById('uploadArea'),
    uploadPlaceholder: document.getElementById('uploadPlaceholder'),
    fileInput: document.getElementById('fileInput'),
    imagePreview: document.getElementById('imagePreview'),
    previewImage: document.getElementById('previewImage'),
    removeBtn: document.getElementById('removeBtn'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    resultsSection: document.getElementById('resultsSection'),
    recommendationsSection: document.getElementById('recommendationsSection'),
    statusIcon: document.getElementById('statusIcon'),
    diagnosisText: document.getElementById('diagnosisText'),
    confidenceValue: document.getElementById('confidenceValue'),
    confidenceFill: document.getElementById('confidenceFill'),
    recommendationsGrid: document.getElementById('recommendationsGrid'),
    treatmentInfo: document.getElementById('treatmentInfo')
};

// ===== State Management =====
let currentFile = null;

// ===== Event Listeners =====
function initializeEventListeners() {
    // Upload area click
    elements.uploadArea.addEventListener('click', (e) => {
        if (e.target !== elements.removeBtn && !elements.removeBtn.contains(e.target)) {
            elements.fileInput.click();
        }
    });

    // File input change
    elements.fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    elements.uploadArea.addEventListener('drop', handleDrop);

    // Remove button
    elements.removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage();
    });

    // Analyze button
    elements.analyzeBtn.addEventListener('click', analyzeImage);
}

// ===== File Handling Functions =====
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        validateAndDisplayFile(file);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    elements.uploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    elements.uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    elements.uploadArea.classList.remove('drag-over');

    const file = e.dataTransfer.files[0];
    if (file) {
        validateAndDisplayFile(file);
    }
}

function validateAndDisplayFile(file) {
    // Validate file type
    if (!CONFIG.acceptedFormats.includes(file.type)) {
        showError('Please upload a PNG or JPEG image file.');
        return;
    }

    // Validate file size
    if (file.size > CONFIG.maxFileSize) {
        showError('File size exceeds 10MB limit.');
        return;
    }

    currentFile = file;
    displayImage(file);
}

function displayImage(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        elements.previewImage.src = e.target.result;
        elements.uploadPlaceholder.style.display = 'none';
        elements.imagePreview.style.display = 'block';
        elements.analyzeBtn.disabled = false;

        // Hide previous results
        elements.resultsSection.style.display = 'none';
        elements.recommendationsSection.style.display = 'none';
    };

    reader.readAsDataURL(file);
}

function removeImage() {
    currentFile = null;
    elements.fileInput.value = '';
    elements.uploadPlaceholder.style.display = 'flex';
    elements.imagePreview.style.display = 'none';
    elements.previewImage.src = '';
    elements.analyzeBtn.disabled = true;

    // Hide results
    elements.resultsSection.style.display = 'none';
    elements.recommendationsSection.style.display = 'none';
}

// ===== Analysis Functions =====
async function analyzeImage() {
    if (!currentFile) return;

    // Show loading state
    elements.analyzeBtn.classList.add('loading');
    elements.analyzeBtn.disabled = true;

    try {
        // Call real API endpoint
        const result = await callPredictionAPI(currentFile);

        // Display results
        displayResults(result);
    } catch (error) {
        showError('Analysis failed. Please make sure the backend server is running.\n\nTo start the server, run: python app.py');
        console.error('Analysis error:', error);
    } finally {
        elements.analyzeBtn.classList.remove('loading');
        elements.analyzeBtn.disabled = false;
    }
}

// Mock prediction function - Kept for testing without backend
async function mockPrediction(file) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock predictions (randomly select one for demo)
    const predictions = ['N_Deficiency', 'P_Deficiency', 'K_Deficiency', 'Healthy'];
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];

    return {
        prediction: randomPrediction,
        confidence: 0.85 + Math.random() * 0.14 // Random confidence between 85-99%
    };
}

// Real API call function
async function callPredictionAPI(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    return await response.json();
}

// ===== Display Functions =====
function displayResults(result) {
    const { prediction, confidence } = result;
    const info = NUTRIENT_INFO[prediction];

    if (!info) {
        showError('Unknown prediction result');
        return;
    }

    // Update diagnosis
    elements.diagnosisText.textContent = info.diagnosis;
    elements.statusIcon.textContent = info.icon;

    // Set status icon class
    elements.statusIcon.className = 'status-icon';
    if (prediction === 'Healthy') {
        elements.statusIcon.classList.add('healthy');
    } else {
        elements.statusIcon.classList.add('deficiency');
    }

    // Update confidence
    const confidencePercent = Math.round(confidence * 100);
    elements.confidenceValue.textContent = `${confidencePercent}%`;

    // Animate confidence bar
    setTimeout(() => {
        elements.confidenceFill.style.width = `${confidencePercent}%`;
    }, 100);

    // Display nutrient recommendations
    displayNutrientRecommendations(info.nutrients);

    // Display treatment information with causes and prevention
    displayTreatmentInfo(info);

    // Show results sections with animation
    elements.resultsSection.style.display = 'block';
    elements.recommendationsSection.style.display = 'block';

    // Scroll to results
    setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

function displayNutrientRecommendations(nutrients) {
    elements.recommendationsGrid.innerHTML = '';

    Object.entries(nutrients).forEach(([key, nutrient]) => {
        const card = document.createElement('div');
        card.className = 'nutrient-card';

        card.innerHTML = `
            <div class="nutrient-header">
                <div class="nutrient-icon ${key}">
                    ${nutrient.symbol}
                </div>
                <div class="nutrient-name">${nutrient.name}</div>
            </div>
            <div class="nutrient-status ${nutrient.status}">
                ${nutrient.status === 'needed' ? '⚠️ Action Required' : '✓ Sufficient'}
            </div>
            <div class="nutrient-description">${nutrient.description}</div>
        `;

        elements.recommendationsGrid.appendChild(card);
    });
}

function displayTreatmentInfo(info) {
    let html = '';

    // Add causes section if available
    if (info.causes && info.causes.length > 0) {
        const causesList = info.causes.map(cause =>
            `<li>${cause}</li>`
        ).join('');

        html += `
            <div class="info-section">
                <h4>🔍 Possible Causes</h4>
                <ul>${causesList}</ul>
            </div>
        `;
    }

    // Add prevention section
    if (info.prevention && info.prevention.length > 0) {
        const preventionList = info.prevention.map(item =>
            `<li>${item}</li>`
        ).join('');

        html += `
            <div class="info-section">
                <h4>🛡️ Prevention Methods</h4>
                <ul>${preventionList}</ul>
            </div>
        `;
    }

    // Add treatment section
    const treatmentList = info.treatment.map(treatment =>
        `<li>${treatment}</li>`
    ).join('');

    html += `
        <div class="info-section">
            <h4>🌱 Recommended Actions</h4>
            <ul>${treatmentList}</ul>
        </div>
    `;

    elements.treatmentInfo.innerHTML = html;
}

// ===== Utility Functions =====
function showError(message) {
    // Simple alert for now - can be replaced with a custom modal
    alert(message);
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    console.log('Coffee Leaf Nutrition Prediction System initialized');
});
