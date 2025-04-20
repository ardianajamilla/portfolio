// Hero Section Animations
(function () {
    // Generate title particles
    function generateTitleParticles() {
        const particlesContainer = document.querySelector('.title-particles');
        if (!particlesContainer) return;

        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'title-particle';

            // Random size (1-3px)
            const size = Math.random() * 2 + 1;

            // Random position (around the title)
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            // Random animation duration (3-8s)
            const duration = Math.random() * 5 + 3;

            // Random delay
            const delay = Math.random() * 2;

            // Apply styles
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, 0.4);
                filter: blur(1px);
                border-radius: 50%;
                top: ${posY}%;
                left: ${posX}%;
                opacity: 0;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
                animation: particleFade ${duration}s infinite ease-in-out ${delay}s;
            `;

            particlesContainer.appendChild(particle);
        }

        // Add keyframes for particle animation
        if (!document.querySelector('#title-particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'title-particle-keyframes';
            style.textContent = `
                @keyframes particleFade {
                    0%, 100% {
                        opacity: 0;
                        transform: translate(0, 0);
                    }
                    50% {
                        opacity: ${Math.random() * 0.5 + 0.2};
                        transform: translate(
                            ${(Math.random() - 0.5) * 20}px, 
                            ${(Math.random() - 0.5) * 20}px
                        );
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Fixed Typewriter animation for subtitle
    function fixedTypewriterAnimation() {
        const typingTextElement = document.querySelector('.typing-text');
        if (!typingTextElement) return;

        const phrases = [
            "Developer • Creator • Innovator",
            "Designer • Programmer • Visionary",
            "Coder • Builder • Problem Solver"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimer;

        // Clear any existing timers to prevent conflicts
        if (typingTimer) clearTimeout(typingTimer);

        function typeNextChar() {
            // Safety check - ensure element still exists in DOM
            if (!document.body.contains(typingTextElement)) return;

            // Get current phrase
            const currentPhrase = phrases[phraseIndex];

            try {
                // Calculate typing speed - varying for more natural effect
                let typeSpeed = isDeleting ? 30 : 70;

                // Add randomness to typing speed for natural feel
                typeSpeed += Math.random() * 20;

                // Update text based on direction
                if (isDeleting) {
                    // Deleting mode
                    typingTextElement.textContent = currentPhrase.substring(0, charIndex);
                    charIndex--;
                } else {
                    // Typing mode
                    typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                }

                // Check for state changes
                if (!isDeleting && charIndex >= currentPhrase.length) {
                    // Finished typing a phrase - pause before deleting
                    isDeleting = true;
                    typeSpeed = 2000; // Pause at end of phrase
                } else if (isDeleting && charIndex < 0) {
                    // Finished deleting - switch to next phrase
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    charIndex = 0;
                    typeSpeed = 600; // Pause before typing new phrase
                }

                // Continue the loop with proper timing
                typingTimer = setTimeout(typeNextChar, typeSpeed);
            } catch (error) {
                console.error("Typewriter animation error:", error);
                // Attempt recovery
                typingTimer = setTimeout(typeNextChar, 1000);
            }
        }

        // Start the animation sequence
        typingTimer = setTimeout(typeNextChar, 1000);

        // Return a cleanup function
        return function cleanup() {
            if (typingTimer) clearTimeout(typingTimer);
        };
    }

    // Initialize hero animations
    function initHeroAnimations() {
        let typewriterCleanup;

        // Wait for the preloader to finish
        const checkPreloader = setInterval(() => {
            const preloader = document.querySelector('.preloader');
            if (!preloader || preloader.classList.contains('fade-out')) {
                clearInterval(checkPreloader);

                // Generate title particles
                generateTitleParticles();

                // Clean up existing typewriter if any
                if (typewriterCleanup) typewriterCleanup();

                // Start fixed typewriter animation
                typewriterCleanup = fixedTypewriterAnimation();
            }
        }, 100);

        // Fallback - if preloader check takes too long
        setTimeout(() => {
            generateTitleParticles();

            // Clean up existing typewriter if any
            if (typewriterCleanup) typewriterCleanup();

            // Start fixed typewriter animation
            typewriterCleanup = fixedTypewriterAnimation();
        }, 3000);

        // Handle page visibility changes to prevent animation issues
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Clean up existing typewriter if any
                if (typewriterCleanup) typewriterCleanup();

                // Restart typewriter animation when page becomes visible again
                typewriterCleanup = fixedTypewriterAnimation();
            }
        });
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initHeroAnimations);
})();