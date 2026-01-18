// ===== Router Configuration =====
const Router = {
    currentRoute: '/home',

    routes: {
        '/home': 'homePage',
        '/prediction': 'predictionPage',
        '/team': 'teamPage'
    },

    init() {
        // Handle initial route
        this.handleRoute();

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
                e.preventDefault();
                const link = e.target.closest('.nav-link') || e.target;
                const route = link.getAttribute('data-route') || link.getAttribute('href');
                this.navigate(route);
            }
        });
    },

    navigate(route) {
        if (this.routes[route]) {
            this.currentRoute = route;
            window.history.pushState({}, '', route);
            this.handleRoute();
        }
    },

    handleRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/home'];

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if ((link.getAttribute('data-route') || link.getAttribute('href')) === path) {
                link.classList.add('active');
            }
        });

        // Render page
        this.renderPage(route);
    },

    renderPage(pageName) {
        const appContent = document.getElementById('app-content');

        switch (pageName) {
            case 'homePage':
                appContent.innerHTML = this.getHomePageHTML();
                break;
            case 'predictionPage':
                appContent.innerHTML = this.getPredictionPageHTML();
                // Initialize prediction page after rendering
                setTimeout(() => this.initPredictionPage(), 100);
                break;
            case 'teamPage':
                appContent.innerHTML = this.getTeamPageHTML();
                break;
            default:
                appContent.innerHTML = this.getHomePageHTML();
        }
    },

    getHomePageHTML() {
        return `
            <div class="container">
                <section class="hero-section">
                    <h2 class="hero-title">Coffee Leaf Nutrition Analysis</h2>
                    <p class="hero-description">Understanding nutrient deficiencies in coffee plants for optimal crop health</p>
                </section>

                <div class="info-grid">
                    <section class="info-card card">
                        <div class="card-header">
                            <h3>🌱 Understanding Coffee Leaf Nutrition</h3>
                        </div>
                        <div class="card-content">
                            <div class="info-image-container">
                                <img src="https://www.aboutcoffee.org/wp-content/uploads/2024/10/ripe-coffee-cherries-on-branch-of-coffee-tree-1024x576.jpg" 
                                     alt="Coffee plantation with green leaves" 
                                     class="info-image"
                                     onerror="this.src='https://www.aboutcoffee.org/wp-content/uploads/2024/10/ripe-coffee-cherries-on-branch-of-coffee-tree-1024x576.jpg'">
                            </div>
                            <p>Coffee plants require essential macronutrients for healthy growth and optimal yield. The three primary macronutrients are Nitrogen (N), Phosphorus (P), and Potassium (K), each playing a crucial role in plant development.</p>
                            
                            <h4>Why Leaf Analysis Matters</h4>
                            <p>Leaf analysis helps identify nutrient deficiencies early, allowing farmers to take corrective measures before significant crop damage occurs. Visual symptoms on leaves are often the first indicators of nutrient imbalances.</p>
                        </div>
                    </section>

                    <section class="info-card card">
                        <div class="card-header">
                            <h3>🍃 Nitrogen (N) Deficiency</h3>
                        </div>
                        <div class="card-content">
                            <div class="info-image-container">
                                <img src="https://happyhydro.com/cdn/shop/articles/img-1691934190660.jpg?v=1695236089" 
                                     alt="Coffee leaf with nitrogen deficiency showing yellowing" 
                                     class="info-image"
                                     onerror="this.src='https://happyhydro.com/cdn/shop/articles/img-1691934190660.jpg?v=1695236089'">
                            </div>
                            <p><strong>Symptoms:</strong> Yellowing of older leaves, stunted growth, reduced leaf size</p>
                            <p><strong>Role:</strong> Essential for chlorophyll production, leaf growth, and protein synthesis</p>
                            <p><strong>Impact:</strong> Reduced photosynthesis, poor vegetative growth, lower yields</p>
                            <ul>
                                <li>Critical for early growth stages</li>
                                <li>Affects overall plant vigor</li>
                                <li>Most commonly deficient in coffee plantations</li>
                            </ul>
                        </div>
                    </section>

                    <section class="info-card card">
                        <div class="card-header">
                            <h3>🌿 Phosphorus (P) Deficiency</h3>
                        </div>
                        <div class="card-content">
                            <div class="info-image-container">
                                <img src="https://di.myupchar.com/2223/phosphorus-deficiency-phosphorus-ki-kami-ke-lakshan-karan-upchar-bachav-ilaj-dawa-in-hindi.webp" 
                                     alt="Coffee plant roots and soil" 
                                     class="info-image"
                                     onerror="this.src='https://di.myupchar.com/2223/phosphorus-deficiency-phosphorus-ki-kami-ke-lakshan-karan-upchar-bachav-ilaj-dawa-in-hindi.webp'">
                            </div>
                            <p><strong>Symptoms:</strong> Dark green or purplish leaves, poor root development, delayed flowering</p>
                            <p><strong>Role:</strong> Energy transfer (ATP), root development, flowering, and fruiting</p>
                            <p><strong>Impact:</strong> Weak root systems, poor fruit set, delayed maturation</p>
                            <ul>
                                <li>Essential for root establishment</li>
                                <li>Critical during flowering phase</li>
                                <li>Important for energy metabolism</li>
                            </ul>
                        </div>
                    </section>

                    <section class="info-card card">
                        <div class="card-header">
                            <h3>🌾 Potassium (K) Deficiency</h3>
                        </div>
                        <div class="card-content">
                            <div class="info-image-container">
                                <img src="https://multisite-assets.icl-growingsolutions.com/wp-content/uploads/sites/12/2024/06/03063204/US_Ag_PotssiumDeficiency_Thumbnail.jpg" 
                                     alt="Coffee beans and healthy coffee plant" 
                                     class="info-image"
                                     onerror="this.src='https://multisite-assets.icl-growingsolutions.com/wp-content/uploads/sites/12/2024/06/03063204/US_Ag_PotssiumDeficiency_Thumbnail.jpg'">
                            </div>
                            <p><strong>Symptoms:</strong> Scorched leaf margins, weak stems, poor fruit quality</p>
                            <p><strong>Role:</strong> Water regulation, disease resistance, fruit quality, stress tolerance</p>
                            <p><strong>Impact:</strong> Reduced drought tolerance, increased disease susceptibility, poor bean quality</p>
                            <ul>
                                <li>Improves stress resistance</li>
                                <li>Enhances bean quality and flavor</li>
                                <li>Important for disease resistance</li>
                            </ul>
                        </div>
                    </section>

                    <section class="info-card card">
                        <div class="card-header">
                            <h3>🔬 How Our Prediction Works</h3>
                        </div>
                        <div class="card-content">
                            <div class="info-image-container">
                                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop" 
                                     alt="AI technology analyzing plant data" 
                                     class="info-image"
                                     onerror="this.src='https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?w=600&h=400&fit=crop'">
                            </div>
                            <p>Our advanced deep learning model uses Convolutional Neural Networks (CNN) to analyze coffee leaf images and detect nutrient deficiencies with high accuracy.</p>
                            <ol>
                                <li><strong>Image Upload:</strong> Upload a clear image of your coffee leaf</li>
                                <li><strong>AI Analysis:</strong> Our model analyzes leaf color, texture, and patterns</li>
                                <li><strong>Detection:</strong> Identifies specific nutrient deficiencies (N, P, K)</li>
                                <li><strong>Recommendations:</strong> Provides targeted treatment recommendations</li>
                            </ol>
                            <div style="margin-top: 1.5rem;">
                                <a href="/prediction" class="btn btn-primary" data-route="/prediction">
                                    Try Prediction Now →
                                </a>
                            </div>
                        </div>
                    </section>

                    <section class="info-card card">
                        <div class="card-header">
                            <h3>📊 Model Performance</h3>
                        </div>
                        <div class="card-content">
                            <p>Our model has been trained on thousands of coffee leaf images and achieves:</p>
                            <ul>
                                <li><strong>High Accuracy:</strong> 92%+ in nutrient deficiency detection</li>
                                <li><strong>Fast Analysis:</strong> Results in seconds</li>
                                <li><strong>Reliable:</strong> Consistent performance across different leaf conditions</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        `;
    },

    getPredictionPageHTML() {
        return `
            <div class="container">
                <section class="hero-section">
                    <h2 class="hero-title">Intelligent Leaf Nutrition Analysis</h2>
                    <p class="hero-description">Upload a coffee leaf image to detect nutrient deficiencies using advanced AI technology and receive personalized recommendations for optimal plant health</p>
                </section>

                <div class="app-grid">
                    <section class="upload-section card">
                        <div class="card-header">
                            <h3>Upload Leaf Image</h3>
                            <p>Supported formats: PNG, JPEG, JPG</p>
                        </div>

                        <div class="upload-area" id="uploadArea">
                            <input type="file" id="fileInput" accept="image/png, image/jpeg, image/jpg" hidden>
                            <div class="upload-placeholder" id="uploadPlaceholder">
                                <svg class="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <h4>Click to upload or drag and drop</h4>
                                <p>Maximum file size: 10MB</p>
                            </div>
                            <div class="image-preview" id="imagePreview" style="display: none;">
                                <img id="previewImage" src="" alt="Preview">
                                <button class="remove-btn" id="removeBtn">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button class="btn btn-primary" id="analyzeBtn" disabled type="button">
                            <span class="btn-text">Analyze Leaf</span>
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </section>

                    <section class="results-section card" id="resultsSection" style="display: none;">
                        <div class="card-header">
                            <h3>Analysis Results</h3>
                        </div>
                        <div class="result-content">
                            <div class="status-badge" id="statusBadge">
                                <div class="status-icon" id="statusIcon"></div>
                                <div class="status-text">
                                    <span class="status-label">Diagnosis</span>
                                    <span class="status-value" id="diagnosisText">-</span>
                                </div>
                            </div>
                            <div class="confidence-meter">
                                <div class="confidence-label">
                                    <span>Confidence Level</span>
                                    <span id="confidenceValue">0%</span>
                                </div>
                                <div class="confidence-bar">
                                    <div class="confidence-fill" id="confidenceFill"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="recommendations-section card" id="recommendationsSection" style="display: none;">
                        <div class="card-header">
                            <h3>Nutrient Recommendations</h3>
                            <p>Based on the detected deficiency</p>
                        </div>
                        <div class="recommendations-grid" id="recommendationsGrid"></div>
                        <div class="treatment-info" id="treatmentInfo"></div>
                    </section>
                </div>
            </div>
        `;
    },

    getTeamPageHTML() {
        const members = [
            { name: 'Supriya Menta', dept: 'Web Developer', imgSrc: 'Team/supriya.jpg', linkedin: 'http://linkedin.com/in/supriya-menta-09507a260', github: 'http://github.com/supriya-menta' },
            { name: 'Nikhath', dept: 'ML Engineer', imgSrc: 'Team/nikhath-profile.jpg', linkedin: 'https://www.linkedin.com/in/mirza-nikhath-fathima-395a3a25b/', github: 'https://github.com/MirzaNikhathFathima' },
            { name: 'Rohitha', dept: 'Full Stack Developer', imgSrc: 'Team/rohitha.jpg', linkedin: 'https://www.linkedin.com/in/rohitha-konasani-5a08a6278/', github: 'https://github.com/rohitha2006' },
            { name: 'Charan', dept: 'UI/UX Designer', imgSrc: 'Team/charan.jpg', linkedin: 'http://linkedin.com/in/nallagatla-sricharan', github: 'https://github.com/nallagatl' }
        ];

        return `
            <div class="container">
                <section class="hero-section">
                    <h2 class="hero-title">Meet Our Team</h2>
                    <p class="hero-description">The dedicated professionals behind the Coffee Leaf Nutrition Prediction System</p>
                </section>

                <div class="team-grid">
                    ${members.map(m => this.getTeamMemberHTML(m)).join('')}
                </div>
            </div>
        `;
    },

    getTeamMemberHTML(member) {
        return `
            <div class="team-card card">
                <div class="member-image-container">
                    <img src="${member.imgSrc}" alt="${member.name}" class="member-image">
                </div>
                <div class="member-info">
                    <h4>${member.name}</h4>
                    <p class="member-dept">${member.dept}</p>
                </div>
                <div class="member-social">
                    <a href="${member.linkedin}" class="social-link" target="_blank" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="${member.github}" class="social-link" target="_blank" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                </div>
            </div>
        `;
    },

    initPredictionPage() {
        // Re-initialize prediction page elements
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

        // Store elements globally for prediction functions
        window.predictionElements = elements;
        window.currentFile = null;

        // Initialize event listeners
        if (elements.uploadArea) {
            elements.uploadArea.addEventListener('click', (e) => {
                if (e.target !== elements.removeBtn && !elements.removeBtn.contains(e.target)) {
                    elements.fileInput.click();
                }
            });
        }

        if (elements.fileInput) {
            elements.fileInput.addEventListener('change', handleFileSelect);
        }

        if (elements.uploadArea) {
            elements.uploadArea.addEventListener('dragover', handleDragOver);
            elements.uploadArea.addEventListener('dragleave', handleDragLeave);
            elements.uploadArea.addEventListener('drop', handleDrop);
        }

        if (elements.removeBtn) {
            elements.removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeImage();
            });
        }

        if (elements.analyzeBtn) {
            elements.analyzeBtn.addEventListener('click', analyzeImage);
        }
    }
};

// ===== Configuration =====
const CONFIG = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    acceptedFormats: ['image/png', 'image/jpeg', 'image/jpg'],
    apiEndpoint: 'http://localhost:5000/predict',
};

// ===== Nutrient Information Database =====
const NUTRIENT_INFO = {
    'N_Deficiency': {
        diagnosis: 'Nitrogen Deficiency Detected',
        icon: '🍃',
        nutrients: {
            nitrogen: { name: 'Nitrogen (N)', symbol: 'N', status: 'needed', description: 'Critical macronutrient needed immediately. Nitrogen is essential for leaf growth and chlorophyll production.' },
            phosphorus: { name: 'Phosphorus (P)', symbol: 'P', status: 'sufficient', description: 'Maintain current levels through regular fertilization schedule.' },
            potassium: { name: 'Potassium (K)', symbol: 'K', status: 'sufficient', description: 'Adequate levels detected. Continue monitoring.' }
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
        nutrients: {
            nitrogen: { name: 'Nitrogen (N)', symbol: 'N', status: 'sufficient', description: 'Current nitrogen levels are adequate.' },
            phosphorus: { name: 'Phosphorus (P)', symbol: 'P', status: 'needed', description: 'Critical deficiency detected. Phosphorus is vital for root development and energy transfer.' },
            potassium: { name: 'Potassium (K)', symbol: 'K', status: 'sufficient', description: 'Potassium levels are within normal range.' }
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
        nutrients: {
            nitrogen: { name: 'Nitrogen (N)', symbol: 'N', status: 'sufficient', description: 'Nitrogen levels are within acceptable range.' },
            phosphorus: { name: 'Phosphorus (P)', symbol: 'P', status: 'sufficient', description: 'Phosphorus levels are adequate.' },
            potassium: { name: 'Potassium (K)', symbol: 'K', status: 'needed', description: 'Severe deficiency detected. Potassium is crucial for disease resistance and fruit quality.' }
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
        nutrients: {
            nitrogen: { name: 'Nitrogen (N)', symbol: 'N', status: 'sufficient', description: 'Optimal nitrogen levels detected. Continue current fertilization.' },
            phosphorus: { name: 'Phosphorus (P)', symbol: 'P', status: 'sufficient', description: 'Phosphorus levels are excellent.' },
            potassium: { name: 'Potassium (K)', symbol: 'K', status: 'sufficient', description: 'Potassium levels are optimal.' }
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

// ===== File Handling Functions =====
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) validateAndDisplayFile(file);
}

function handleDragOver(e) {
    e.preventDefault();
    if (window.predictionElements?.uploadArea) {
        window.predictionElements.uploadArea.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    e.preventDefault();
    if (window.predictionElements?.uploadArea) {
        window.predictionElements.uploadArea.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    if (window.predictionElements?.uploadArea) {
        window.predictionElements.uploadArea.classList.remove('drag-over');
    }
    const file = e.dataTransfer.files[0];
    if (file) validateAndDisplayFile(file);
}

function validateAndDisplayFile(file) {
    if (!CONFIG.acceptedFormats.includes(file.type)) {
        alert('Please upload a PNG or JPEG image file.');
        return;
    }
    if (file.size > CONFIG.maxFileSize) {
        alert('File size exceeds 10MB limit.');
        return;
    }
    window.currentFile = file;
    displayImage(file);
}

function displayImage(file) {
    const reader = new FileReader();
    const elements = window.predictionElements;
    if (!elements) return;

    reader.onload = (e) => {
        elements.previewImage.src = e.target.result;
        elements.uploadPlaceholder.style.display = 'none';
        elements.imagePreview.style.display = 'block';
        elements.analyzeBtn.disabled = false;
        elements.resultsSection.style.display = 'none';
        elements.recommendationsSection.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    const elements = window.predictionElements;
    if (!elements) return;

    window.currentFile = null;
    elements.fileInput.value = '';
    elements.uploadPlaceholder.style.display = 'flex';
    elements.imagePreview.style.display = 'none';
    elements.previewImage.src = '';
    elements.analyzeBtn.disabled = true;
    elements.resultsSection.style.display = 'none';
    elements.recommendationsSection.style.display = 'none';
}

// ===== Analysis Functions =====
async function analyzeImage() {
    if (!window.currentFile || !window.predictionElements) return;

    const elements = window.predictionElements;
    elements.analyzeBtn.classList.add('loading');
    elements.analyzeBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('file', window.currentFile);
        const response = await fetch(CONFIG.apiEndpoint, { method: 'POST', body: formData });

        if (!response.ok) throw new Error('API request failed');
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        alert('Analysis failed. Please make sure the backend server is running on http://localhost:5000');
        console.error('Analysis error:', error);
    } finally {
        elements.analyzeBtn.classList.remove('loading');
        elements.analyzeBtn.disabled = false;
    }
}

function displayResults(result) {
    const elements = window.predictionElements;
    if (!elements) return;

    const { prediction, confidence } = result;
    const info = NUTRIENT_INFO[prediction];
    if (!info) {
        alert('Unknown prediction result');
        return;
    }

    elements.diagnosisText.textContent = info.diagnosis;
    elements.statusIcon.textContent = info.icon;
    elements.statusIcon.className = 'status-icon ' + (prediction === 'Healthy' ? 'healthy' : 'deficiency');

    const confidencePercent = Math.round(confidence * 100);
    elements.confidenceValue.textContent = `${confidencePercent}%`;
    setTimeout(() => { elements.confidenceFill.style.width = `${confidencePercent}%`; }, 100);

    displayNutrientRecommendations(info.nutrients);
    displayTreatmentInfo(info.treatment);

    elements.resultsSection.style.display = 'block';
    elements.recommendationsSection.style.display = 'block';

    setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

function displayNutrientRecommendations(nutrients) {
    const elements = window.predictionElements;
    if (!elements?.recommendationsGrid) return;

    elements.recommendationsGrid.innerHTML = '';
    Object.entries(nutrients).forEach(([key, nutrient]) => {
        const card = document.createElement('div');
        card.className = 'nutrient-card';
        card.innerHTML = `
            <div class="nutrient-header">
                <div class="nutrient-icon ${key}">${nutrient.symbol}</div>
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

function displayTreatmentInfo(treatments) {
    const elements = window.predictionElements;
    if (!elements?.treatmentInfo) return;

    const treatmentList = treatments.map(t => `<li>${t}</li>`).join('');
    elements.treatmentInfo.innerHTML = `<h4>Recommended Actions</h4><ul>${treatmentList}</ul>`;
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
    console.log('Coffee Leaf Nutrition Prediction System initialized');
});
