// Hexagonal Skills Animation
(function () {
    // Animate skill hexagons when they enter viewport
    function animateSkillsOnScroll() {
        const skillGroups = document.querySelectorAll('.hex-skill-group');
        const skillHexagons = document.querySelectorAll('.hex-skill');

        if (!skillGroups.length || !skillHexagons.length) return;

        // Animate skill groups first
        const groupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    groupObserver.unobserve(entry.target);

                    // Get all hexagons within this group
                    const hexagonsInGroup = entry.target.querySelectorAll('.hex-skill');

                    // Animate each hexagon with a delay based on its position
                    hexagonsInGroup.forEach((hexagon, index) => {
                        setTimeout(() => {
                            hexagon.classList.add('visible');

                            // Animate the level fill after the hexagon appears
                            setTimeout(() => {
                                hexagon.classList.add('animate');
                            }, 300);
                        }, index * 150); // Stagger the animations
                    });
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe each skill group
        skillGroups.forEach(group => {
            groupObserver.observe(group);
        });

        // Add interactive hover effects
        skillHexagons.forEach(hexagon => {
            // Particle effect on hover
            hexagon.addEventListener('mouseenter', createParticleEffect);
        });
    }

    // Create particle effect on hexagon hover
    function createParticleEffect(event) {
        const hexagon = event.currentTarget;
        const icon = hexagon.querySelector('i');

        if (!icon) return;

        // Don't create particles too frequently
        if (hexagon.dataset.particleTimeout) return;

        // Create 5-10 particles
        const particleCount = Math.floor(Math.random() * 6) + 5;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.className = 'hex-particle';

            // Position particle around the icon
            const rect = icon.getBoundingClientRect();
            const hexRect = hexagon.getBoundingClientRect();

            const x = rect.left - hexRect.left + rect.width / 2;
            const y = rect.top - hexRect.top + rect.height / 2;

            // Random starting position around the icon
            const startX = x + (Math.random() - 0.5) * 20;
            const startY = y + (Math.random() - 0.5) * 20;

            // Random movement direction
            const moveX = (Math.random() - 0.5) * 50;
            const moveY = (Math.random() - 0.5) * 50;

            // Random size and opacity
            const size = Math.random() * 4 + 1;
            const opacity = Math.random() * 0.5 + 0.3;

            // Apply initial styles
            particle.style.cssText = `
                position: absolute;
                top: ${startY}px;
                left: ${startX}px;
                width: ${size}px;
                height: ${size}px;
                background-color: var(--secondary-color);
                border-radius: 50%;
                opacity: ${opacity};
                pointer-events: none;
                z-index: 10;
            `;

            // Add to hexagon
            hexagon.appendChild(particle);

            // Animate the particle
            setTimeout(() => {
                particle.style.transition = 'all 1s ease-out';
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                particle.style.opacity = '0';
            }, 10);

            // Remove the particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }

        // Prevent creating too many particles
        hexagon.dataset.particleTimeout = true;
        setTimeout(() => {
            delete hexagon.dataset.particleTimeout;
        }, 500);
    }

    // Initialize hexagonal skills animations
    function initHexSkillsAnimations() {
        // Add hexagon style to document head
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .hex-particle {
                filter: blur(1px);
                box-shadow: 0 0 5px var(--secondary-color);
            }
        `;
        document.head.appendChild(styleElement);

        // Wait for the preloader to finish
        const checkPreloader = setInterval(() => {
            const preloader = document.querySelector('.preloader');
            if (!preloader || preloader.classList.contains('fade-out')) {
                clearInterval(checkPreloader);

                // Start skills animations
                setTimeout(animateSkillsOnScroll, 500);
            }
        }, 100);

        // Fallback - if preloader check takes too long
        setTimeout(animateSkillsOnScroll, 3000);
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initHexSkillsAnimations);
})();