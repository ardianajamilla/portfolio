// Product Filtering Functionality
(function () {
    // Setup product filtering
    function initProductFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCategories = document.querySelectorAll('.product-category');

        if (!filterButtons.length || !productCategories.length) return;

        // Ensure "All Products" is active by default
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter categories with smooth transitions
                productCategories.forEach(category => {
                    // Add a fade-out transition
                    if (filterValue === 'all' || category.getAttribute('data-category') === filterValue) {
                        // Show this category
                        category.style.opacity = '0';
                        category.classList.remove('hidden');

                        // Fade it in after a tiny delay
                        setTimeout(() => {
                            category.style.transition = 'opacity 0.4s ease';
                            category.style.opacity = '1';
                        }, 50);
                    } else {
                        // Hide this category
                        category.style.transition = 'opacity 0.3s ease';
                        category.style.opacity = '0';

                        // After fade-out completes, hide it completely
                        setTimeout(() => {
                            category.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
    }

    // Animate products on scroll
    function animateProducts() {
        const productCards = document.querySelectorAll('.product-card');
        if (!productCards.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a little delay to each card based on its position
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Array.from(productCards).indexOf(entry.target) * 100);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe
        productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }

    // Initialize all product features
    function initProducts() {
        document.addEventListener('DOMContentLoaded', () => {
            initProductFilters();
            animateProducts();
        });
    }

    // Start initialization
    initProducts();
})();