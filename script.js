const HIGHLIGHT_INTERVAL = 6000;
const COUNTDOWN_DURATION = 2 * 60 * 60 * 1000; // 2 hours

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        if (expanded) {
            menu.setAttribute('hidden', '');
        } else {
            menu.removeAttribute('hidden');
        }
    });
}

function initHighlightSlider() {
    const slider = document.querySelector('[data-highlight-slider]');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.highlight-item'));
    const dots = Array.from(document.querySelectorAll('.slider-dot'));
    let index = 0;

    function setActiveSlide(nextIndex) {
        slides.forEach((slide, i) => {
            if (i === nextIndex) {
                slide.setAttribute('data-active', '');
            } else {
                slide.removeAttribute('data-active');
            }
        });

        dots.forEach((dot, i) => {
            const isActive = i === nextIndex;
            dot.setAttribute('aria-selected', String(isActive));
        });

        index = nextIndex;
    }

    const cycle = () => {
        const next = (index + 1) % slides.length;
        setActiveSlide(next);
    };

    let intervalId = setInterval(cycle, HIGHLIGHT_INTERVAL);

    dots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => {
            setActiveSlide(dotIndex);
            clearInterval(intervalId);
            intervalId = setInterval(cycle, HIGHLIGHT_INTERVAL);
        });
    });
}

function initCountdown() {
    const countdownEl = document.querySelector('[data-countdown]');
    if (!countdownEl) return;

    const deadline = Date.now() + COUNTDOWN_DURATION;

    function updateCountdown() {
        const diff = deadline - Date.now();
        if (diff <= 0) {
            countdownEl.textContent = '00:00:00';
            clearInterval(intervalId);
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const format = (value) => value.toString().padStart(2, '0');
        countdownEl.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    }

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
}

function initTabs() {
    const tabs = Array.from(document.querySelectorAll('.tab-button'));
    const panels = Array.from(document.querySelectorAll('[data-panel]'));
    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach((button) => button.setAttribute('aria-selected', String(button === tab)));
            panels.forEach((panel) => {
                const isTarget = panel.dataset.panel === target;
                if (isTarget) {
                    panel.removeAttribute('hidden');
                } else {
                    panel.setAttribute('hidden', '');
                }
            });
        });
    });
}

function updateYear() {
    const yearEl = document.querySelector('[data-current-year]');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHighlightSlider();
    initCountdown();
    initTabs();
    updateYear();
});
