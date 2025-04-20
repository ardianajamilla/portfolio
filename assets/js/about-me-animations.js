// About Me Section Animations
(function () {
    // Text highlight animation
    function initTextHighlights() {
        const highlights = document.querySelectorAll('.story-content .highlight');
        if (!highlights.length) return;

        // Add a subtle animation to highlights as they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(10px)';

                    // Animate in with a small delay
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px'
        });

        highlights.forEach((highlight, index) => {
            // Stagger the initial state
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateY(10px)';

            // Stagger the observation timing
            setTimeout(() => {
                observer.observe(highlight);
            }, index * 100);
        });
    }

    // Add subtle parallax effect on profile image
    function initProfileParallax() {
        const profileImage = document.querySelector('.profile-image img');
        if (!profileImage) return;

        document.addEventListener('mousemove', (e) => {
            const xPos = (window.innerWidth / 2 - e.clientX) / 50;
            const yPos = (window.innerHeight / 2 - e.clientY) / 50;

            profileImage.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.05)`;
        });

        // Reset when mouse leaves
        document.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // Initialize all animations
    function initAboutMeAnimations() {
        // Wait for the preloader to finish
        const checkPreloader = setInterval(() => {
            const preloader = document.querySelector('.preloader');
            if (!preloader || preloader.classList.contains('fade-out')) {
                clearInterval(checkPreloader);

                // Start animations
                setTimeout(() => {
                    initTextHighlights();
                    initProfileParallax();
                }, 500);
            }
        }, 100);

        // Fallback - if preloader check takes too long
        setTimeout(() => {
            initTextHighlights();
            initProfileParallax();
        }, 3000);
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initAboutMeAnimations);
})();