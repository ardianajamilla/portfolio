// Enhanced Preloader Script
(function () {
    const preloader = document.querySelector('.preloader');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderPercentage = document.querySelector('.loader-percentage');
    let progressValue = 0;

    // Ensure the preloader is visible initially
    preloader.style.opacity = 1;
    preloader.style.visibility = 'visible';

    // Create particles dynamically
    function createParticles() {
        const particlesContainer = document.querySelector('.preloader-particles');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            // Random size
            const size = Math.random() * 3 + 1;

            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;

            // Random animation duration
            const duration = Math.random() * 10 + 10;

            // Apply styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                filter: blur(1px);
                animation: floatParticle ${duration}s infinite ease-in-out alternate;
                animation-delay: ${Math.random() * 5}s;
            `;

            particlesContainer.appendChild(particle);
        }

        // Add keyframes for particle animation
        if (!document.querySelector('#particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(
                            ${(Math.random() - 0.5) * 100}px, 
                            ${(Math.random() - 0.5) * 100}px
                        );
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Update the progress bar and percentage
    function updateProgress() {
        const increment = 1;
        const maxProgress = 100;
        const interval = 20; // 20ms between updates

        const progressInterval = setInterval(() => {
            progressValue += increment;

            if (progressValue <= maxProgress) {
                // Update the progress bar width
                loaderProgress.style.width = progressValue + '%';

                // Update the percentage text
                loaderPercentage.textContent = progressValue + '%';
            } else {
                // Stop the interval when we reach max progress
                clearInterval(progressInterval);

                // Hide the preloader
                hidePreloader();
            }
        }, interval);
    }

    // Function to hide preloader
    function hidePreloader() {
        // Add a small delay before starting the fade out
        setTimeout(() => {
            // Add the fade-out class to animate the transition
            preloader.classList.add('fade-out');

            // Remove the preloader from the DOM after transition completes
            setTimeout(() => {
                preloader.style.display = 'none';
                // Enable scrolling on body
                document.body.style.overflow = 'auto';
            }, 800); // Match the transition duration in CSS
        }, 300);
    }

    // Initialize preloader effects
    function initPreloader() {
        // Create the particle effects
        createParticles();

        // Start updating the progress
        updateProgress();

        // Set a fallback timer to hide the preloader if something goes wrong
        setTimeout(() => {
            if (progressValue < 100) {
                // Force progress to 100% if not already there
                progressValue = 100;
                loaderProgress.style.width = '100%';
                loaderPercentage.textContent = '100%';
                hidePreloader();
            }
        }, 5000);
    }

    // Prevent interaction with page content during loading
    document.body.style.overflow = 'hidden';

    // Initialize everything
    document.addEventListener('DOMContentLoaded', initPreloader);
})();