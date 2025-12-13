// Performance monitoring
const perfStart = performance.now();
console.log('🚀 Hatch Page Loading Started...');

// Preload hero images immediately
const preloadImages = () => {
    const heroImages = document.querySelectorAll('.hero-interface img');
    heroImages.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
    console.log('✓ Hero images preloaded');
};

// Initialize Lucide Icons
lucide.createIcons();
console.log('✓ Lucide Icons initialized');

// Utility: Toggle classes efficiently
const toggleClass = (element, removeClass, addClass) => {
    if (!element) return;
    element.classList.remove(removeClass);
    element.classList.add(addClass);
};

// Theme Toggle - Optimized
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Initialize theme
const initTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.theme;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
};

initTheme();

themeToggleBtn?.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    localStorage.theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
});
console.log('✓ Theme system initialized');

// Scroll Reveal - Optimized with requestAnimationFrame
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('is-visible');
            });
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

console.log('✓ Scroll reveal observer created');

// Observe all reveal elements
const initRevealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => revealObserver.observe(el));
    console.log(`✓ Observing ${revealElements.length} reveal elements`);
    
    // Ensure hero images are loaded
    preloadImages();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealOnScroll);
} else {
    initRevealOnScroll();
}

// Carousel Logic - Optimized
const cards = Array.from(document.querySelectorAll('.carousel-card'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

const updateCarousel = () => {
    cards.forEach(card => {
        card.classList.remove('active', 'prev', 'next', 'hidden-card');
        card.classList.add('carousel-card');
    });
    const len = cards.length;
    const prevIndex = (currentIndex - 1 + len) % len;
    const nextIndex = (currentIndex + 1) % len;
    
    cards[currentIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');
};
nextBtn?.addEventListener('click', () => { 
    currentIndex = (currentIndex + 1) % cards.length; 
    updateCarousel(); 
});

prevBtn?.addEventListener('click', () => { 
    currentIndex = (currentIndex - 1 + cards.length) % cards.length; 
    updateCarousel(); 
});

console.log('✓ Carousel initialized with', cards.length, 'cards');
// Pricing Toggle Logic
const billingToggle = document.getElementById('billingToggle');
const toggleBg = document.getElementById('toggleBg');
const monthlyBtn = document.getElementById('monthlyBtn');
const annualBtn = document.getElementById('annualBtn');
const priceTotals = document.querySelectorAll('.price-total');
const billingPeriods = document.querySelectorAll('.billing-period');
const addonPrices = document.querySelectorAll('.addon-price');
const addonPeriods = document.querySelectorAll('.addon-period');
const annualStrikes = document.querySelectorAll('.annual-strike');
const annualSaves = document.querySelectorAll('.annual-save');
const seatPrices = document.querySelectorAll('.seat-price');
const annualBadge = document.querySelector('.annual-badge');
let isAnnual = false;

console.log('✓ Pricing toggle initialized');

billingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    
    if (isAnnual) {
        toggleBg.style.transform = 'translateX(100%)';
        
        monthlyBtn.classList.remove('text-white');
        monthlyBtn.classList.add('text-zinc-500', 'dark:text-zinc-400');
        
        annualBtn.classList.remove('text-zinc-500', 'dark:text-zinc-400');
        annualBtn.classList.add('text-white');
        
        // Show savings badge
        if (annualBadge) annualBadge.classList.remove('hidden');
        
        // Update seat prices to annual
        seatPrices.forEach(el => {
            el.textContent = el.dataset.annual;
        });
        
        priceTotals.forEach(el => {
            el.textContent = el.dataset.annual;
        });
        billingPeriods.forEach(el => el.textContent = '/year');

        // Show annual discount UI
        annualStrikes.forEach(el => {
            el.textContent = el.dataset.full;
            el.classList.remove('hidden');
        });
        annualSaves.forEach(el => el.classList.remove('hidden'));

        // Update Addons
        addonPrices.forEach(el => {
            el.textContent = el.dataset.annual; 
        });
        addonPeriods.forEach(el => el.textContent = 'per seat/year');

        // Show addon savings
        const addonStrikes = document.querySelectorAll('.addon-strike');
        const addonSavings = document.querySelectorAll('.addon-save');
        addonStrikes.forEach(el => el.classList.remove('hidden'));
        addonSavings.forEach(el => el.classList.remove('hidden'));

    } else {
        toggleBg.style.transform = 'translateX(0)';
        
        monthlyBtn.classList.remove('text-zinc-500', 'dark:text-zinc-400');
        monthlyBtn.classList.add('text-white');
        
        annualBtn.classList.remove('text-white');
        annualBtn.classList.add('text-zinc-500', 'dark:text-zinc-400');

        // Hide savings badge
        if (annualBadge) annualBadge.classList.add('hidden');
        
        // Reset seat prices to monthly
        seatPrices.forEach(el => {
            el.textContent = el.dataset.monthly;
        });

        priceTotals.forEach(el => el.textContent = el.dataset.monthly);
        billingPeriods.forEach(el => el.textContent = '/month');

        // Hide annual discount UI
        annualStrikes.forEach(el => el.classList.add('hidden'));
        annualSaves.forEach(el => el.classList.add('hidden'));

        // Update Addons
        addonPrices.forEach(el => {
            el.textContent = el.dataset.monthly; 
        });
        addonPeriods.forEach(el => el.textContent = 'per seat/mo');

        // Hide addon savings
        const addonStrikes = document.querySelectorAll('.addon-strike');
        const addonSavings = document.querySelectorAll('.addon-save');
        addonStrikes.forEach(el => el.classList.add('hidden'));
        addonSavings.forEach(el => el.classList.add('hidden'));
    }
    
    console.log('💰 Billing switched to:', isAnnual ? 'Annual' : 'Monthly');
});

// FAQ Accordion
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    const isOpen = content.style.gridTemplateRows === '1fr';
    
    if (isOpen) {
        content.style.gridTemplateRows = '0fr';
        content.style.opacity = '0';
        icon.style.transform = 'rotate(0deg)';
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus w-4 h-4 text-zinc-400"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
    } else {
        content.style.gridTemplateRows = '1fr';
        content.style.opacity = '1';
        icon.style.transform = 'rotate(180deg)';
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus w-4 h-4 text-zinc-900 dark:text-white"><path d="M5 12h14"/></svg>';
    }
}

console.log('✓ FAQ accordion initialized');

// Performance monitoring end
window.addEventListener('load', () => {
    const perfEnd = performance.now();
    const loadTime = (perfEnd - perfStart).toFixed(2);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Hatch Page Fully Loaded!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⏱️  Total Load Time:', loadTime + 'ms');
    console.log('📊 Performance Metrics:');
    console.log('   - DOM Content Loaded:', (performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart) + 'ms');
    console.log('   - Page Load:', (performance.timing.loadEventEnd - performance.timing.navigationStart) + 'ms');
    console.log('   - DOM Ready:', (performance.timing.domInteractive - performance.timing.navigationStart) + 'ms');
    
    // Memory usage (if available)
    if (performance.memory) {
        console.log('💾 Memory Usage:');
        console.log('   - Used:', (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + 'MB');
        console.log('   - Total:', (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + 'MB');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
