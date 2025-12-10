// Particle.js Configuration
// Easy customization for particle settings

const PARTICLE_CONFIG = {
    // ===== MAIN SETTINGS =====
    particleCount: 80,              // Change this to adjust number of particles
    densityEnabled: true,
    densityArea: 800,
    
    // ===== PARTICLE APPEARANCE =====
    particleSize: 3,                // Size of individual particles
    particleSizeRandom: true,       // Random particle sizes
    
    // ===== OPACITY SETTINGS =====
    particleOpacityLight: 0.5,      // Particle opacity in light mode
    particleOpacityDark: 0.6,       // Particle opacity in dark mode
    
    // ===== LINE SETTINGS =====
    lineDistance: 150,              // Distance to draw lines between particles
    lineOpacityLight: 0.35,         // Line opacity in light mode
    lineOpacityDark: 0.4,           // Line opacity in dark mode
    lineWidth: 1,                   // Line thickness
    
    // ===== MOVEMENT SETTINGS =====
    moveSpeed: 2,                   // How fast particles move
    moveDirection: 'none',          // 'none', 'top', 'bottom', 'left', 'right', etc.
    
    // ===== INTERACTION SETTINGS =====
    grabDistance: 200,              // Distance for grab effect on hover
    grabLineOpacityLight: 0.7,      // Grab line opacity in light mode
    grabLineOpacityDark: 0.8        // Grab line opacity in dark mode
};

// Initialize particles.js with theme-compatible settings
function initParticles() {
    // Check if particlesJS library is loaded
    if (typeof particlesJS === 'undefined') {
        console.error('particlesJS library is not loaded');
        return;
    }
    
    // Check if target element exists
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        console.error('particles-js container element not found');
        return;
    }
    
    const isDark = document.documentElement.classList.contains('dark');
    const particleColor = isDark ? '#ffffff' : '#000000';
    const lineColor = isDark ? '#ffffff' : '#000000';
    
    // Destroy existing particles if reinitializing
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: PARTICLE_CONFIG.particleCount,
                density: {
                    enable: PARTICLE_CONFIG.densityEnabled,
                    value_area: PARTICLE_CONFIG.densityArea
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: isDark ? PARTICLE_CONFIG.particleOpacityDark : PARTICLE_CONFIG.particleOpacityLight,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: PARTICLE_CONFIG.particleSize,
                random: PARTICLE_CONFIG.particleSizeRandom,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: PARTICLE_CONFIG.lineDistance,
                color: lineColor,
                opacity: isDark ? PARTICLE_CONFIG.lineOpacityDark : PARTICLE_CONFIG.lineOpacityLight,
                width: PARTICLE_CONFIG.lineWidth
            },
            move: {
                enable: true,
                speed: PARTICLE_CONFIG.moveSpeed,
                direction: PARTICLE_CONFIG.moveDirection,
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: false
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: PARTICLE_CONFIG.grabDistance,
                    line_linked: {
                        opacity: isDark ? PARTICLE_CONFIG.grabLineOpacityDark : PARTICLE_CONFIG.grabLineOpacityLight
                    }
                }
            }
        },
        retina_detect: true
    });
}

// Initialize particles on page load with debounce for theme changes

let themeChangeTimeout;
function setupParticlesAndThemeToggle() {
    initParticles();
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            clearTimeout(themeChangeTimeout);
            // Reduce debounce to 30ms for immediate update
            themeChangeTimeout = setTimeout(initParticles, 30);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupParticlesAndThemeToggle);
} else {
    setupParticlesAndThemeToggle();
}
