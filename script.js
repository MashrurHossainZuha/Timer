document.addEventListener('DOMContentLoaded', () => {
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const offerModal = document.getElementById('offerModal');
    const closeOfferBtn = document.getElementById('closeOffer');
    const shopOfferBtn = document.getElementById('shopOffer');

    const openModal = () => {
        if (!offerModal) return;
        offerModal.classList.add('is-visible');
        offerModal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        if (!offerModal) return;
        offerModal.classList.remove('is-visible');
        offerModal.setAttribute('aria-hidden', 'true');
    };

    setTimeout(() => {
        openModal();
    }, 600);

    closeOfferBtn?.addEventListener('click', closeModal);
    offerModal?.addEventListener('click', (event) => {
        if (event.target === offerModal) {
            closeModal();
        }
    });

    shopOfferBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        closeModal();
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    });

    const searchForm = document.querySelector('.primary-search');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const input = searchForm.querySelector('input');
            const query = input?.value.trim();
            if (query) {
                const heroEyebrow = document.querySelector('.eyebrow');
                if (heroEyebrow) {
                    heroEyebrow.textContent = `Searching for “${query}”`;
                    setTimeout(() => {
                        heroEyebrow.textContent = 'Glow for every girl';
                    }, 3000);
                }
            }
        });
    }

    const carousel = document.querySelector('[data-carousel]');
    if (carousel) {
        const track = carousel.querySelector('[data-slides]');
        const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
        const dots = Array.from(carousel.querySelectorAll('[data-dot]'));
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        let currentIndex = 0;
        let autoRotateId;

        const activateSlide = (index) => {
            if (!track) return;
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('is-active', slideIndex === currentIndex);
            });
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('is-active', dotIndex === currentIndex);
            });
        };

        const startAutoRotate = () => {
            clearInterval(autoRotateId);
            autoRotateId = window.setInterval(() => {
                activateSlide(currentIndex + 1);
            }, 6000);
        };

        prevBtn?.addEventListener('click', () => {
            activateSlide(currentIndex - 1);
            startAutoRotate();
        });

        nextBtn?.addEventListener('click', () => {
            activateSlide(currentIndex + 1);
            startAutoRotate();
        });

        dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', () => {
                activateSlide(dotIndex);
                startAutoRotate();
            });
        });

        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotateId);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoRotate();
        });

        activateSlide(0);
        startAutoRotate();
    }

    const countdownContainer = document.querySelector('[data-countdown]');
    if (countdownContainer) {
        const daysEl = countdownContainer.querySelector('[data-days]');
        const hoursEl = countdownContainer.querySelector('[data-hours]');
        const minutesEl = countdownContainer.querySelector('[data-minutes]');
        const secondsEl = countdownContainer.querySelector('[data-seconds]');
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 5);
        targetDate.setHours(20, 0, 0, 0);

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const seconds = Math.floor(diff / 1000);
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(secs).padStart(2, '0');
        };

        updateCountdown();
        window.setInterval(updateCountdown, 1000);
    }
});
