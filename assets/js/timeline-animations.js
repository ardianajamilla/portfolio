// Timeline Animations
(function () {
    // Animate timeline items when they enter viewport
    function animateTimelineOnScroll() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (!timelineItems.length) return;

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

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize timeline animations
    function initTimelineAnimations() {
        // Wait for the preloader to finish
        const checkPreloader = setInterval(() => {
            const preloader = document.querySelector('.preloader');
            if (!preloader || preloader.classList.contains('fade-out')) {
                clearInterval(checkPreloader);

                // Start timeline animations
                setTimeout(animateTimelineOnScroll, 500);
            }
        }, 100);

        // Fallback - if preloader check takes too long
        setTimeout(animateTimelineOnScroll, 3000);
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initTimelineAnimations);
})();