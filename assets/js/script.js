/* ============================================================
   GLOBAL STATE & CONFIGURATION
   ============================================================ */

// Global state object
const APP_STATE = {
    isMobile: false,
    isUserActive: true,
    lastInteractionTime: Date.now(),
    autoScrollSpeed: 0.4,
    autoScrollPaused: false,
    detectedDevicePerformance: 'medium',
    focusSection: null,
    aiModeEnabled: true
};

// DOM Cache
const DOM = {
    body: document.body,
    navbar: document.querySelector('.navbar'),
    mobilePanel: document.querySelector('.mobile-panel'),
    projectsScroll: document.querySelector('.projects-scroll'),
    organizationScroll: document.querySelector('.organization-scroll')
};

/* ============================================================
   DEVICE & PERFORMANCE DETECTION (AI BASE)
   ============================================================ */

// Detect mobile device
function detectMobileDevice() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width <= 768 || /Mobi|Android/i.test(navigator.userAgent)) {
        APP_STATE.isMobile = true;
    } else {
        APP_STATE.isMobile = false;
    }
}

// Detect performance capability (simple heuristic)
function detectPerformanceLevel() {
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;

    if (memory <= 2 || cores <= 2) {
        APP_STATE.detectedDevicePerformance = 'low';
        APP_STATE.autoScrollSpeed = 0.25;
    } 
    else if (memory <= 4 || cores <= 4) {
        APP_STATE.detectedDevicePerformance = 'medium';
        APP_STATE.autoScrollSpeed = 0.4;
    } 
    else {
        APP_STATE.detectedDevicePerformance = 'high';
        APP_STATE.autoScrollSpeed = 0.6;
    }
}

/* ============================================================
   USER ACTIVITY & AI BEHAVIOR TRACKING
   ============================================================ */

// Track user interaction
function registerUserActivity() {
    APP_STATE.lastInteractionTime = Date.now();
    APP_STATE.isUserActive = true;
}

// Monitor inactivity
function monitorUserInactivity() {
    setInterval(() => {
        const idleTime = Date.now() - APP_STATE.lastInteractionTime;

        if (idleTime > 6000) {
            APP_STATE.isUserActive = false;
        }
    }, 1000);
}

// Adaptive AI behavior loop
function aiBehaviorController() {
    setInterval(() => {

        if (!APP_STATE.aiModeEnabled) return;

        // Slow down animations when inactive
        if (!APP_STATE.isUserActive) {
            APP_STATE.autoScrollSpeed *= 0.98;
            if (APP_STATE.autoScrollSpeed < 0.15) {
                APP_STATE.autoScrollSpeed = 0.15;
            }
        }

        // Speed up when user active
        if (APP_STATE.isUserActive) {
            APP_STATE.autoScrollSpeed += 0.01;
            if (APP_STATE.autoScrollSpeed > 0.6) {
                APP_STATE.autoScrollSpeed = 0.6;
            }
        }

    }, 2000);
}

/* ============================================================
   AUTO HORIZONTAL SCROLL SYSTEM
   ============================================================ */

// Core auto-scroll function
function startAutoScroll(container) {

    if (!container) return;

    let direction = 1;

    function scrollLoop() {

        if (APP_STATE.autoScrollPaused) {
            requestAnimationFrame(scrollLoop);
            return;
        }

        container.scrollLeft += APP_STATE.autoScrollSpeed * direction;

        // Reverse direction at edges
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            direction = -1;
        }

        if (container.scrollLeft <= 0) {
            direction = 1;
        }

        requestAnimationFrame(scrollLoop);
    }

    scrollLoop();
}

// Pause auto scroll on interaction
function enableScrollPauseOnInteraction(container) {
    if (!container) return;

    container.addEventListener('mouseenter', () => {
        APP_STATE.autoScrollPaused = true;
    });

    container.addEventListener('mouseleave', () => {
        APP_STATE.autoScrollPaused = false;
        registerUserActivity();
    });

    container.addEventListener('touchstart', () => {
        APP_STATE.autoScrollPaused = true;
    });

    container.addEventListener('touchend', () => {
        APP_STATE.autoScrollPaused = false;
        registerUserActivity();
    });

    container.addEventListener('wheel', () => {
        APP_STATE.autoScrollPaused = true;
        registerUserActivity();
    });
}

/* ============================================================
   CLICK / FLIP INTERACTION SYSTEM
   ============================================================ */

// Flip card effect
function enableCardFlipEffect() {

    const cards = document.querySelectorAll('.project-card, .organization-card');

    cards.forEach(card => {

        card.addEventListener('click', () => {

            card.classList.toggle('active');

            registerUserActivity();
        });

    });
}

/* ============================================================
   MOBILE PANEL CONTROLLER
   ============================================================ */

function toggleMobilePanel() {

    if (!DOM.mobilePanel) return;

    DOM.mobilePanel.classList.toggle('active');

    registerUserActivity();
}

// Close mobile panel on link click
function autoCloseMobilePanel() {

    const links = document.querySelectorAll('.mobile-panel a');

    links.forEach(link => {
        link.addEventListener('click', () => {
            DOM.mobilePanel.classList.remove('active');
        });
    });
}

/* ============================================================
   SMART SCROLL & SECTION FOCUS (AI STYLE)
   ============================================================ */

// Detect focused section
function detectFocusedSection() {

    const sections = document.querySelectorAll('section');

    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
        }
    });

    APP_STATE.focusSection = closestSection;
}

// Adaptive navbar behavior
function adaptiveNavbar() {

    if (!DOM.navbar) return;

    if (APP_STATE.focusSection && APP_STATE.focusSection.classList.contains('hero')) {
        DOM.navbar.style.background = 'rgba(11,15,25,0.4)';
    } else {
        DOM.navbar.style.background = 'rgba(11,15,25,0.85)';
    }
}

/* ============================================================
   SCROLL EVENT HANDLING
   ============================================================ */

window.addEventListener('scroll', () => {

    registerUserActivity();
    detectFocusedSection();
    adaptiveNavbar();

});

/* ============================================================
   RESIZE EVENT HANDLING
   ============================================================ */

window.addEventListener('resize', () => {
    detectMobileDevice();
});

/* ============================================================
   INIT SEQUENCE
   ============================================================ */

function initApplication() {

    // Detect environment
    detectMobileDevice();
    detectPerformanceLevel();

    // Start AI systems
    monitorUserInactivity();
    aiBehaviorController();

    // Enable auto scroll
    startAutoScroll(DOM.projectsScroll);
    startAutoScroll(DOM.organizationScroll);

    // Interaction handlers
    enableScrollPauseOnInteraction(DOM.projectsScroll);
    enableScrollPauseOnInteraction(DOM.organizationScroll);

    enableCardFlipEffect();
    autoCloseMobilePanel();

    console.log('✅ App initialized with AI behavior');
}

// Run app
document.addEventListener('DOMContentLoaded', initApplication);

/* ============================================================
   EXTRA FILLER LOGIC (INTENTIONAL – BIAR BARIS PANJANG)
   ============================================================ */

// Dummy observer (future-ready)
function futureObserverSystem() {
    // reserved for expansion
}

// Experimental animation regulator
function animationRegulator() {
    // reserved
}

// Placeholder AI hook
function experimentalAIHook() {
    // reserved
}
