// Products Section Functionality
(function () {
    // Filter products by category
    function initProductFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        if (!filterButtons.length || !productCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter products with animation
                productCards.forEach(card => {
                    // Reset any previous animations
                    card.classList.remove('fade-out');
                    card.style.display = '';

                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        // Card should be visible
                        setTimeout(() => {
                            card.classList.remove('hidden');
                        }, 50);
                    } else {
                        // Card should be hidden
                        card.classList.add('fade-out');
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
    }

    // Load more functionality (simulation)
    function initLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', () => {
            // Show loading state
            const originalText = loadMoreBtn.innerHTML;
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;

            // Simulate loading delay
            setTimeout(() => {
                // Reset button
                loadMoreBtn.innerHTML = originalText;
                loadMoreBtn.disabled = false;

                // Show message that all products are loaded
                const productsContainer = document.querySelector('.products-container');
                const message = document.createElement('div');
                message.className = 'load-more-message';
                message.style.textAlign = 'center';
                message.style.marginTop = '20px';
                message.style.color = 'var(--accent-color)';
                message.style.opacity = '0';
                message.style.transform = 'translateY(20px)';
                message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                message.innerText = 'All products have been loaded!';

                productsContainer.appendChild(message);

                // Trigger animation
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0)';
                }, 50);

                // Hide load more button
                loadMoreBtn.style.opacity = '0';
                loadMoreBtn.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    loadMoreBtn.style.display = 'none';
                }, 500);
            }, 1500);
        });
    }

    // Animate product cards on scroll
    function animateProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        if (!productCards.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';

                    // Staggered animation
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Array.from(productCards).indexOf(entry.target) * 100);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        productCards.forEach(card => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
    }

    // Initialize all product functions
    function initProducts() {
        // Wait for the preloader to finish
        const checkPreloader = setInterval(() => {
            const preloader = document.querySelector('.preloader');
            if (!preloader || preloader.classList.contains('fade-out')) {
                clearInterval(checkPreloader);

                // Start product functionality
                setTimeout(() => {
                    initProductFilters();
                    initLoadMore();
                    animateProductCards();
                }, 500);
            }
        }, 100);

        // Fallback - if preloader check takes too long
        setTimeout(() => {
            initProductFilters();
            initLoadMore();
            animateProductCards();
        }, 3000);
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initProducts);
})();