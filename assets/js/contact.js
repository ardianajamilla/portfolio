// Contact Platforms Functionality
(function() {
    // Initialize animations and interactions
    function initContactPlatforms() {
        // Animate in the platform cards on load/scroll
        animatePlatformCards();
        
        // Set up copy functionality
        initCopyFeature();
    }
    
    // Animate platform cards with sequence and delay
    function animatePlatformCards() {
        const cards = document.querySelectorAll('.platform-card');
        const responseNote = document.querySelector('.response-note');
        
        if (!cards.length) return;
        
        // Use Intersection Observer for scroll-based animations
        const observer = new IntersectionObserver((entries) => {
            let delay = 0;
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate card with delay
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, delay);
                    
                    delay += 150; // Stagger the animations
                    observer.unobserve(entry.target);
                    
                    // If last card, animate the response note
                    if (entry.target === cards[cards.length - 1] && responseNote) {
                        setTimeout(() => {
                            responseNote.classList.add('animate');
                        }, delay + 200);
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe each platform card
        cards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Copy text to clipboard functionality
    function initCopyFeature() {
        const copyTriggers = document.querySelectorAll('.copy-trigger');
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        // Set up all copy triggers (text elements)
        copyTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const textToCopy = trigger.dataset.copy || trigger.textContent.trim();
                copyToClipboard(textToCopy, trigger);
            });
        });
        
        // Set up all copy buttons
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const textToCopy = button.dataset.copy;
                copyToClipboard(textToCopy, button);
                
                // Also mark the associated text element as copied
                const relatedTrigger = document.querySelector(`.copy-trigger[data-copy="${textToCopy}"]`);
                if (relatedTrigger) {
                    relatedTrigger.classList.add('copied');
                    setTimeout(() => {
                        relatedTrigger.classList.remove('copied');
                    }, 2000);
                }
            });
        });
    }
    
    // Helper function to copy text to clipboard
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            // Show copied state
            element.classList.add('copied');
            
            // Reset after delay
            setTimeout(() => {
                element.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
    
    // Add hover effects to platform cards
    function addPlatformCardEffects() {
        const cards = document.querySelectorAll('.platform-card');
        
        cards.forEach(card => {
            // Add parallax effect on hover
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                // Calculate tilt amounts (subtle effect)
                const tiltX = (y / rect.height - 0.5) * 4; // -2 to 2 degree tilt
                const tiltY = (0.5 - x / rect.width) * 4;
                
                // Apply transform
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
                
                // Move icon slightly in the opposite direction of cursor
                const icon = card.querySelector('.icon-wrapper');
                if (icon) {
                    const moveX = (x / rect.width - 0.5) * -10; // -5px to 5px movement
                    const moveY = (y / rect.height - 0.5) * -10;
                    icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                }
            });
            
            // Reset transforms on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                
                const icon = card.querySelector('.icon-wrapper');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initContactPlatforms();
        addPlatformCardEffects();
    });
})();