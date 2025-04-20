// Animation Scripts
(function () {
    // Text animation sequence
    function animateText() {
        const textElements = document.querySelectorAll('.text-animate');

        textElements.forEach((element, index) => {
            // Add visible class with delay
            setTimeout(() => {
                element.classList.add('visible');
            }, 100 * index);
        });
    }

    // Animate elements when they enter viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .fade-in-text, .slide-in-text');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Animate skill progress bars
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.setProperty('--progress-width', width);
                        entry.target.classList.add('animate');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        skillItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Parallax scrolling effect
    function setupParallax() {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');

        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            parallaxLayers.forEach(layer => {
                const speed = layer.getAttribute('data-speed') || 0.05;
                const x = (0.5 - mouseX) * 100 * speed;
                const y = (0.5 - mouseY) * 100 * speed;

                layer.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Smoke animation enhancement
    function enhanceSmoke() {
        const smokeEffect = document.querySelector('.smoke-effect');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);

            smokeEffect.style.transform = `rotate(${scrollPercent * 10}deg) scale(${1 + scrollPercent * 0.2})`;
        });
    }

    // Animate on page load
    function pageLoadAnimation() {
        // Add class to body to trigger page load animation
        document.body.classList.add('page-loaded');

        // Animate title if it exists
        const pageTitle = document.querySelector('.page-title h1');
        if (pageTitle) {
            pageTitle.classList.add('visible');
        }
    }

    // Initialize all animations
    function initAnimations() {
        // Start text animation after a short delay
        setTimeout(animateText, 500);

        // Setup other animations
        animateOnScroll();
        setupParallax();
        enhanceSmoke();
        animateSkills();

        // Page load animation
        setTimeout(pageLoadAnimation, 100);
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initAnimations);
})();