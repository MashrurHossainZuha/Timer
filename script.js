const sliderTrack = document.getElementById('sliderTrack');
const slides = Array.from(sliderTrack.children);
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;
let autoSlideInterval;

function updateSlider(index) {
    const totalSlides = slides.length;
    currentSlide = (index + totalSlides) % totalSlides;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        updateSlider(currentSlide + 1);
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    updateSlider(currentSlide - 1);
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    updateSlider(currentSlide + 1);
    startAutoSlide();
});

sliderTrack.addEventListener('mouseenter', stopAutoSlide);
sliderTrack.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();

function initializeCountdown() {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 72);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const days = Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0);
        const hours = Math.max(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0);
        const minutes = Math.max(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 0);
        const seconds = Math.max(Math.floor((distance % (1000 * 60)) / 1000), 0);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

initializeCountdown();

const offerModal = document.getElementById('offerModal');
const closeModal = document.getElementById('closeModal');

function showModal() {
    offerModal.classList.add('active');
    offerModal.setAttribute('aria-hidden', 'false');
}

function hideModal() {
    offerModal.classList.remove('active');
    offerModal.setAttribute('aria-hidden', 'true');
}

closeModal.addEventListener('click', hideModal);
offerModal.addEventListener('click', (event) => {
    if (event.target === offerModal) {
        hideModal();
    }
});

window.addEventListener('load', () => {
    setTimeout(showModal, 800);
});
