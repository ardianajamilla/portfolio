// Status Bar with Auto-Slider
(function () {
    // Clone icons for continuous loop effect
    function setupIconSlider() {
        const slider = document.querySelector('.icon-slider');
        if (!slider) return;

        // Clone all slides to create a seamless loop
        const slides = slider.querySelectorAll('.icon-slide');
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            slider.appendChild(clone);
        });
    }

    // Random icon color effect
    function randomIconEffect() {
        const icons = document.querySelectorAll('.icon-slide i');
        if (!icons.length) return;

        // Apply subtle color shifts to random icons periodically
        setInterval(() => {
            // Get random icon
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];

            // Apply highlight effect
            randomIcon.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.7)';
            randomIcon.style.transform = 'scale(1.2)';
            randomIcon.style.color = '#ffffff';

            // Reset after a short delay
            setTimeout(() => {
                randomIcon.style.textShadow = '';
                randomIcon.style.transform = '';
                randomIcon.style.color = '';
            }, 700);
        }, 1500);
    }

    // Initialize status bar
    function initStatusBar() {
        setupIconSlider();
        randomIconEffect();
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initStatusBar);
})();