// Select all slides and buttons
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Select toggle and interval dropdown (to be added in HTML)
const autoToggle = document.querySelector('#auto-toggle');
const intervalSelect = document.querySelector('#interval-select');

let currentIndex = 0;
let autoSlideInterval; // Stores setInterval reference
let intervalTime = 3000; // Default interval: 3 seconds

// Show the current slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Show next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length; // Loop back to start
    showSlide(currentIndex);
}

// Show previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to end
    showSlide(currentIndex);
}

// Start automatic slideshow
function startAutoSlide() {
    stopAutoSlide(); // Clear any previous interval
    autoSlideInterval = setInterval(nextSlide, intervalTime);
}

// Stop automatic slideshow
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Handle toggle
autoToggle.addEventListener('change', () => {
    if (autoToggle.checked) {
        startAutoSlide();
    } else {
        stopAutoSlide();
    }
});

// Handle interval change
intervalSelect.addEventListener('change', () => {
    intervalTime = parseInt(intervalSelect.value) * 1000; // Convert seconds to ms
    if (autoToggle.checked) {
        startAutoSlide(); // Restart with new interval
    }
});

// Event listeners for buttons
nextBtn.addEventListener('click', () => {
    nextSlide();
    if (autoToggle.checked) {
        startAutoSlide(); // Restart timer on manual navigation
    }
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    if (autoToggle.checked) {
        startAutoSlide();
    }
});

// Initialize slider
showSlide(currentIndex);
startAutoSlide();
