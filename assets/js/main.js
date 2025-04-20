// Main JavaScript Functionality
(function () {
    // Header scroll effect
    function handleHeaderScroll() {
        const header = document.getElementById('header');
        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-link');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Close menu when a link is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    // Discord username copy functionality
    function setupDiscordCopy() {
        const discordElement = document.querySelector('.discord-username');
        const discordIcon = document.querySelector('.discord-icon');
        const discordUsername = 'bangibraheem';

        if (discordElement) {
            discordElement.addEventListener('click', () => {
                navigator.clipboard.writeText(discordUsername).then(() => {
                    discordElement.classList.add('copied');

                    // Remove the 'copied' class after 2 seconds
                    setTimeout(() => {
                        discordElement.classList.remove('copied');
                    }, 2000);
                });
            });
        }

        if (discordIcon) {
            discordIcon.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(discordUsername).then(() => {
                    // Show a tooltip or notification
                    alert('Discord username copied: ' + discordUsername);
                });
            });
        }
    }

    // Contact form submission
    function handleContactForm() {
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.querySelector('.form-success-message');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Here you would normally send the form data to a server
                // For this demo, we'll just show the success message

                // Show success message
                successMessage.classList.add('visible');

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('visible');
                }, 5000);
            });
        }
    }

    // Initialize all functionality
    function init() {
        handleHeaderScroll();
        setupMobileMenu();
        setupDiscordCopy();
        handleContactForm();
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', init);
})();