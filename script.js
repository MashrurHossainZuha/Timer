document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            offset: 100
        });
    }

    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    function handleScrollShadow() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleScrollShadow();
    window.addEventListener('scroll', handleScrollShadow, { passive: true });

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
            });
        });
    }

    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const productName = event.currentTarget.dataset.product || 'Selected item';
            event.currentTarget.classList.add('added');
            event.currentTarget.textContent = 'Added';
            setTimeout(() => {
                event.currentTarget.classList.remove('added');
                event.currentTarget.textContent = 'Add to Cart';
            }, 2000);
            console.info(`${productName} added to cart.`);
        });
    });

    setupCarousel('.hero-carousel', 5000);
    setupCarousel('.testimonial-carousel', 6000);
    startCountdown(2 * 60 * 60); // 2 hour countdown
    setupNewsletterPopup();
    initializeQuizTimer();

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

function setupCarousel(selector, intervalTime) {
    const carousel = document.querySelector(selector);
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track, .testimonial-track');
    const dotsContainer = carousel.querySelector('.carousel-dots, .testimonial-dots');
    const items = track ? Array.from(track.children) : [];

    if (!track || items.length === 0) return;

    let currentIndex = 0;

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        if (!dotsContainer) return;
        Array.from(dotsContainer.children).forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index < 0 ? items.length - 1 : index % items.length;
        const computed = window.getComputedStyle(track);
        const gap = parseFloat(computed.columnGap || computed.gap || 0);
        const offset = -currentIndex * (items[0].getBoundingClientRect().width + gap);
        track.style.transform = `translateX(${offset}px)`;
        updateDots();
    }

    let intervalId = setInterval(() => goToSlide(currentIndex + 1), intervalTime);

    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(() => goToSlide(currentIndex + 1), intervalTime);
    }

    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', resetInterval);

    window.addEventListener('resize', () => {
        goToSlide(currentIndex);
    });

    goToSlide(0);
}

function startCountdown(durationInSeconds) {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const timerEl = document.getElementById('countdown-timer');

    if (!hoursEl || !minutesEl || !secondsEl || !timerEl) return;

    let remaining = durationInSeconds;

    function updateTimer() {
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;

        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
        timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (remaining <= 0) {
            clearInterval(intervalId);
            timerEl.textContent = 'Offer ended';
        }

        remaining = Math.max(remaining - 1, 0);
    }

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
}

function setupNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    const closeBtn = document.getElementById('close-popup');
    const form = popup ? popup.querySelector('form') : null;

    if (!popup) return;

    setTimeout(() => {
        popup.classList.add('active');
    }, 1800);

    function closePopup() {
        popup.classList.remove('active');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopup();
        }
    });

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            closePopup();
            alert('Thank you for subscribing!');
        });
    }
}

function initializeQuizTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    let seconds = 60 * 60;

    const intervalId = setInterval(() => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

        if (seconds <= 0) {
            clearInterval(intervalId);
            timerElement.textContent = 'Time up!';
        }

        seconds = Math.max(seconds - 1, 0);
    }, 1000);
}
