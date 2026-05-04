/* ============================================
   NOTRE UNIVERS - SCRIPT.JS
   Logique Complète de l'Application
   ============================================ */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    PASSWORD: 'amour123', // Mot de passe pour accéder au site
    COUPLE_START_DATE: '2023-01-14', // Date du début de la relation (modifier selon vos besoins)
};

const QUIZ_QUESTIONS = [
    {
        question: 'Quel est mon plat préféré ?',
        options: ['Pizza', 'Pâtes', 'Sushi', 'Burger'],
        correctAnswer: 0,
        emoji: '🍕'
    },
    {
        question: 'Quelle est ma couleur préférée ?',
        options: ['Bleu', 'Rose', 'Violet', 'Noir'],
        correctAnswer: 2,
        emoji: '🎨'
    },
    {
        question: 'Mon film préféré ?',
        options: ['Action', 'Romance', 'Comédie', 'Thriller'],
        correctAnswer: 1,
        emoji: '🎬'
    },
    {
        question: 'Ma plus grande peur ?',
        options: ['Les araignées', 'Les hauteurs', 'Te perdre', 'Les avions'],
        correctAnswer: 2,
        emoji: '😨'
    },
    {
        question: 'Mon rêve est de...',
        options: ['Voyager', 'Danser', 'Grandir à tes côtés', 'Écrire'],
        correctAnswer: 2,
        emoji: '✨'
    }
];

const SURPRISES = [
    "💌 \"Les moments avec toi sont ma plus belle aventure\"",
    "🎁 Défi couple: Regardez le coucher de soleil ensemble et partagez un souhait",
    "🍽️ Idée rendez-vous: Pique-nique sous les étoiles",
    "💕 \"Je t'aime parce que tu me fais rire\"",
    "🎬 Défi couple: Regardez un film love story ensemble",
    "🌙 Idée rendez-vous: Balade nocturne main dans la main",
    "✨ \"Avec toi, même les silences sont parfaits\"",
    "🎭 Défi couple: Dessinez votre portrait l'un l'autre",
    "🍰 Idée rendez-vous: Cuisinez votre gâteau préféré ensemble",
    "❤️ \"Tu es mon univers\"",
    "🎵 Défi couple: Dansez sur votre chanson préférée",
    "☕ Idée rendez-vous: Petit déjeuner au lit surprise"
];

// ============================================
// ÉTAT GLOBAL DE L'APPLICATION
// ============================================

const APP_STATE = {
    isLoggedIn: false,
    currentSection: 'accueil',
    quizInProgress: false,
    quizScore: 0,
    quizAnswers: [],
    messages: [],
    souvenirs: [],
    playlist: [],
    surprises: [],
};

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌌 Notre Univers - Initialisation');
    
    // Charger les données depuis localStorage
    loadAllData();
    
    // Vérifier si déjà connecté
    if (localStorage.getItem('loggedIn') === 'true') {
        showMainApp();
    } else {
        showLoginPage();
    }
    
    // Initialiser les événements
    setupEventListeners();
    
    // Animer les étoiles
    drawStars('starsCanvas');
    drawBackgroundStars('backgroundStars');
    
    // Afficher le compteur de jours
    updateCoupleTimer();
    
    // Afficher le message romantique aléatoire
    showRandomRomanticMessage();
});

// ============================================
// STARS ANIMATION
// ============================================

function drawStars(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    
    // Créer les étoiles
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random() * 0.5 + 0.5,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            twinkleValue: Math.random()
        });
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        stars.forEach(star => {
            star.twinkleValue += star.twinkleSpeed;
            star.opacity = Math.abs(Math.sin(star.twinkleValue)) * 0.5 + 0.3;
            
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
}

function drawBackgroundStars(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    // Créer les particules
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.6 + 0.2,
            color: ['#FFD700', '#00f5ff', '#9d4edd', '#ff006e'][Math.floor(Math.random() * 4)]
        });
    }
    
    function animateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Réinitialiser si hors écran
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animateBackground);
    }
    
    animateBackground();
    
    // Réajuster la taille du canvas au redimensionnement
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// LOGIN SYSTEM
// ============================================

function setupEventListeners() {
    // LOGIN
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // NAVIGATION
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });
    
    // MESSAGES
    document.getElementById('messageForm').addEventListener('submit', addMessage);
    
    // SOUVENIRS
    document.getElementById('souvenirForm').addEventListener('submit', addSouvenir);
    
    // QUIZ
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    
    // PLAYLIST
    document.getElementById('musicForm').addEventListener('submit', addMusic);
    
    // SURPRISE
    document.getElementById('surpriseBtn').addEventListener('click', showSurprise);
    
    // LOGOUT
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // CTA BUTTONS
    document.querySelectorAll('.cta-buttons .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            switchSection(section);
        });
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const password = document.getElementById('passwordInput').value;
    const hint = document.getElementById('loginHint');
    
    if (password === CONFIG.PASSWORD) {
        localStorage.setItem('loggedIn', 'true');
        APP_STATE.isLoggedIn = true;
        showMainApp();
        hint.textContent = '';
    } else {
        hint.textContent = '❌ Mot de passe incorrect. Indice: C\'est le mot qui décrits nos sentiments! 💕';
        hint.style.color = '#ff006e';
        document.getElementById('passwordInput').value = '';
        
        // Animation d'erreur
        document.querySelector('.login-box').style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.querySelector('.login-box').style.animation = '';
        }, 500);
    }
}

function logout() {
    if (confirm('Es-tu sûr de vouloir te déconnecter? 😢')) {
        localStorage.setItem('loggedIn', 'false');
        APP_STATE.isLoggedIn = false;
        location.reload();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('hidden');
}

function showMainApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
}

// ============================================
// NAVIGATION
// ============================================

function handleNavigation(e) {
    const section = e.target.dataset.section;
    if (section && section !== 'logout') {
        switchSection(section);
    }
}

function switchSection(section) {
    // Mettre à jour l'état
    APP_STATE.currentSection = section;
    
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });
    
    // Afficher la section sélectionnée
    const activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === section) {
            btn.classList.add('active');
        }
    });
    
    // Actualiser le contenu si nécessaire
    if (section === 'messages') {
        displayMessages();
    } else if (section === 'souvenirs') {
        displaySouvenirs();
    } else if (section === 'playlist') {
        displayPlaylist();
    } else if (section === 'jeu') {
        displayQuizStart();
    }
    
    // Scroll vers le haut
    window.scrollTo(0, 0);
}

// ============================================
// COUPLE TIMER
// ============================================

function updateCoupleTimer() {
    const startDate = new Date(CONFIG.COUPLE_START_DATE);
    const today = new Date();
    
    const timeDiff = today - startDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    let timerText = '';
    if (years > 0) {
        timerText = `${years} an${years > 1 ? 's' : ''} ensemble ❤️`;
    } else if (months > 0) {
        timerText = `${months} mois ensemble 💕`;
    } else {
        timerText = `${days} jours ensemble ✨`;
    }
    
    document.getElementById('coupleTimer').textContent = timerText;
}

// ============================================
// MESSAGES
// ============================================

function addMessage(e) {
    e.preventDefault();
    
    const name = document.getElementById('messageName').value;
    const text = document.getElementById('messageText').value;
    
    if (!name || !text) {
        alert('Veuillez remplir tous les champs! 💌');
        return;
    }
    
    const message = {
        id: Date.now(),
        from: name,
        text: text,
        date: new Date().toLocaleDateString('fr-FR'),
        hidden: true
    };
    
    APP_STATE.messages.push(message);
    saveToLocalStorage('messages', APP_STATE.messages);
    
    // Réinitialiser le formulaire
    e.target.reset();
    
    // Afficher les messages
    displayMessages();
    
    // Animation de succès
    showNotification('💌 Message ajouté avec amour!');
}

function displayMessages() {
    const container = document.getElementById('messagesDisplay');
    
    if (APP_STATE.messages.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Pas encore de messages... Écris un message d\'amour! 💌</p></div>';
        return;
    }
    
    container.innerHTML = APP_STATE.messages.map(msg => `
        <div class="message-card" onclick="toggleMessageHidden(${msg.id})">
            <div>
                <div class="message-from">De: ${msg.from}</div>
                <div class="message-text" id="text-${msg.id}" style="display: ${msg.hidden ? 'none' : 'block'}">
                    ${msg.text}
                </div>
                <div class="message-hidden" id="hidden-${msg.id}" style="display: ${msg.hidden ? 'block' : 'none'}">
                    🔒 Clique pour révéler...
                </div>
            </div>
            <div class="message-delete" onclick="deleteMessage(${msg.id}, event)">
                🗑️ Supprimer
            </div>
        </div>
    `).join('');
}

function toggleMessageHidden(id) {
    const message = APP_STATE.messages.find(m => m.id === id);
    if (message) {
        message.hidden = !message.hidden;
        saveToLocalStorage('messages', APP_STATE.messages);
        displayMessages();
    }
}

function deleteMessage(id, e) {
    e.stopPropagation();
    APP_STATE.messages = APP_STATE.messages.filter(m => m.id !== id);
    saveToLocalStorage('messages', APP_STATE.messages);
    displayMessages();
    showNotification('Message supprimé 🗑️');
}

// ============================================
// SOUVENIRS
// ============================================

function addSouvenir(e) {
    e.preventDefault();
    
    const date = document.getElementById('souvenirDate').value;
    const title = document.getElementById('souvenirTitle').value;
    const description = document.getElementById('souvenirDescription').value;
    const image = document.getElementById('souvenirImage').value;
    
    if (!date || !title || !description) {
        alert('Veuillez remplir tous les champs! 📸');
        return;
    }
    
    const souvenir = {
        id: Date.now(),
        date: date,
        title: title,
        description: description,
        image: image || 'https://via.placeholder.com/400x300?text=Souvenir+Précieux',
    };
    
    APP_STATE.souvenirs.push(souvenir);
    APP_STATE.souvenirs.sort((a, b) => new Date(b.date) - new Date(a.date));
    saveToLocalStorage('souvenirs', APP_STATE.souvenirs);
    
    e.target.reset();
    displaySouvenirs();
    showNotification('📸 Souvenir sauvegardé!');
}

function displaySouvenirs() {
    const container = document.getElementById('souvenirsList');
    
    if (APP_STATE.souvenirs.length === 0) {
        container.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><p>Aucun souvenir pour le moment... Ajoute notre plus beau moment! 📸</p></div>';
        return;
    }
    
    container.innerHTML = APP_STATE.souvenirs.map(souvenir => `
        <div class="souvenir-card">
            <img src="${souvenir.image}" alt="${souvenir.title}" class="souvenir-image" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Indisponible'">
            <div class="souvenir-content">
                <div class="souvenir-date">${new Date(souvenir.date).toLocaleDateString('fr-FR')}</div>
                <div class="souvenir-title">${souvenir.title}</div>
                <div class="souvenir-description">${souvenir.description}</div>
                <button class="souvenir-delete" onclick="deleteSouvenir(${souvenir.id})">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

function deleteSouvenir(id) {
    APP_STATE.souvenirs = APP_STATE.souvenirs.filter(s => s.id !== id);
    saveToLocalStorage('souvenirs', APP_STATE.souvenirs);
    displaySouvenirs();
    showNotification('Souvenir supprimé 🗑️');
}

// ============================================
// QUIZ
// ============================================

function displayQuizStart() {
    const container = document.getElementById('quizContent');
    container.innerHTML = '';
}

function startQuiz() {
    APP_STATE.quizInProgress = true;
    APP_STATE.quizScore = 0;
    APP_STATE.quizAnswers = [];
    
    displayQuizQuestion(0);
}

function displayQuizQuestion(questionIndex) {
    if (questionIndex >= QUIZ_QUESTIONS.length) {
        displayQuizResults();
        return;
    }
    
    const question = QUIZ_QUESTIONS[questionIndex];
    const container = document.getElementById('quizContent');
    
    const progressPercent = ((questionIndex) / QUIZ_QUESTIONS.length) * 100;
    
    container.innerHTML = `
        <div class="quiz-question">
            <div class="quiz-progress">
                Question ${questionIndex + 1} sur ${QUIZ_QUESTIONS.length}
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
            <h3>${question.emoji} ${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectQuizAnswer(${questionIndex}, ${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectQuizAnswer(questionIndex, answerIndex) {
    const question = QUIZ_QUESTIONS[questionIndex];
    
    if (answerIndex === question.correctAnswer) {
        APP_STATE.quizScore += 20; // 20 points par bonne réponse
    }
    
    APP_STATE.quizAnswers[questionIndex] = answerIndex;
    
    // Afficher la prochaine question après un petit délai
    setTimeout(() => {
        displayQuizQuestion(questionIndex + 1);
    }, 500);
}

function displayQuizResults() {
    const percentage = (APP_STATE.quizScore / 100) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = '🎉 Parfait! Tu me connais sur le bout des doigts! Je t\'adore! ❤️';
    } else if (percentage >= 80) {
        message = '💕 Très bien! Tu me connais vraiment bien! J\'adore ca! 😊';
    } else if (percentage >= 60) {
        message = '🌟 Pas mal! On devrait passer plus de temps ensemble pour que tu me connaisses mieux! 😄';
    } else {
        message = '💫 Pas grave! C\'est l\'occasion d\'apprendre à me connaître encore plus! Let\'s go! 😉';
    }
    
    const container = document.getElementById('quizContent');
    container.innerHTML = `
        <div class="quiz-score">
            <h3>Score: ${APP_STATE.quizScore}/100</h3>
            <p>${percentage.toFixed(0)}%</p>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="startQuiz()">Rejouer 🎮</button>
        </div>
    `;
    
    APP_STATE.quizInProgress = false;
}

// ============================================
// PLAYLIST
// ============================================

function addMusic(e) {
    e.preventDefault();
    
    const title = document.getElementById('musicTitle').value;
    const artist = document.getElementById('musicArtist').value;
    const url = document.getElementById('musicUrl').value;
    const message = document.getElementById('musicMessage').value;
    
    if (!title || !artist || !url) {
        alert('Veuillez remplir tous les champs requis! 🎵');
        return;
    }
    
    const music = {
        id: Date.now(),
        title: title,
        artist: artist,
        url: url,
        message: message,
    };
    
    APP_STATE.playlist.push(music);
    saveToLocalStorage('playlist', APP_STATE.playlist);
    
    e.target.reset();
    displayPlaylist();
    showNotification('🎵 Chanson ajoutée à la playlist!');
}

function displayPlaylist() {
    const container = document.getElementById('playlistDisplay');
    
    if (APP_STATE.playlist.length === 0) {
        container.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><p>La playlist est vide... Ajoute notre chanson préférée! 🎵</p></div>';
        return;
    }
    
    container.innerHTML = APP_STATE.playlist.map(music => `
        <div class="music-card">
            <div class="music-title">🎵 ${music.title}</div>
            <div class="music-artist">par ${music.artist}</div>
            <div class="music-message">"${music.message}"</div>
            <div class="music-actions">
                <button class="btn-listen" onclick="window.open('${music.url}', '_blank')">
                    ▶️ Écouter
                </button>
                <button class="btn-delete-music" onclick="deleteMusic(${music.id})">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function deleteMusic(id) {
    APP_STATE.playlist = APP_STATE.playlist.filter(m => m.id !== id);
    saveToLocalStorage('playlist', APP_STATE.playlist);
    displayPlaylist();
    showNotification('Chanson supprimée 🗑️');
}

// ============================================
// SURPRISE
// ============================================

function showSurprise() {
    const randomSurprise = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
    
    document.getElementById('surpriseText').textContent = randomSurprise;
    document.getElementById('surpriseText').style.animation = 'none';
    setTimeout(() => {
        document.getElementById('surpriseText').style.animation = 'fadeInText 0.8s ease-out';
    }, 10);
    
    // Ajouter à l'historique
    const history = document.getElementById('surpriseHistory');
    const item = document.createElement('div');
    item.className = 'surprise-item';
    item.textContent = randomSurprise;
    history.insertBefore(item, history.firstChild);
    
    // Limiter l'historique à 10 items
    while (history.children.length > 10) {
        history.removeChild(history.lastChild);
    }
    
    // Animation du bouton
    const btn = document.getElementById('surpriseBtn');
    btn.style.animation = 'none';
    setTimeout(() => {
        btn.style.animation = 'glowPulse 2s ease-in-out infinite';
    }, 10);
}

// ============================================
// MESSAGES ALÉATOIRES ROMANTIQUES
// ============================================

function showRandomRomanticMessage() {
    const messages = [
        'Chaque moment avec toi est une constellation qui brille à jamais dans mon ciel...',
        'Tu es mon univers, mon soleil et mes étoiles...',
        'Je t\'aime plus que toutes les étoiles du ciel...',
        'Avec toi, mon univers est complet...',
        'Tu es la plus belle découverte de mon univers...',
        'Notre amour est écrit dans les étoiles...',
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const messageEl = document.getElementById('romanticMessage');
    
    if (messageEl) {
        messageEl.textContent = randomMessage;
    }
}

// ============================================
// LOCALSTORAGE
// ============================================

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(`notre-univers-${key}`, JSON.stringify(data));
    } catch (e) {
        console.error('Erreur lors de la sauvegarde:', e);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(`notre-univers-${key}`);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Erreur lors du chargement:', e);
        return [];
    }
}

function loadAllData() {
    APP_STATE.messages = loadFromLocalStorage('messages');
    APP_STATE.souvenirs = loadFromLocalStorage('souvenirs');
    APP_STATE.playlist = loadFromLocalStorage('playlist');
}

// ============================================
// NOTIFICATION
// ============================================

function showNotification(text) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700 0%, #00f5ff 100%);
        color: #0a0a0a;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
    `;
    notification.textContent = text;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Animation CSS pour notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInText {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// RESPONSIVE HANDLING
// ============================================

window.addEventListener('resize', () => {
    const starsCanvas = document.getElementById('starsCanvas');
    if (starsCanvas) {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
    }
});

console.log('✨ Notre Univers est prêt! 💕');
