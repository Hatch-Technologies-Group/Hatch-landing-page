// Initialize Lucide Icons
lucide.createIcons();

// Theme Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}
themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    localStorage.theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
});

// Scroll Reveal
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

// Carousel Logic
const cards = Array.from(document.querySelectorAll('.carousel-card'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function updateCarousel() {
    cards.forEach(card => card.classList.remove('active', 'prev', 'next', 'hidden-card'));
    const activeIndex = currentIndex;
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    const nextIndex = (currentIndex + 1) % cards.length;
    cards[activeIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');
}
nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % cards.length; updateCarousel(); });
prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + cards.length) % cards.length; updateCarousel(); });

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
});

// FAQ Accordion
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    if (content.style.gridTemplateRows === '1fr') {
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
