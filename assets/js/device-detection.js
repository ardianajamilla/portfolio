// Device Detection Script
(function () {
    function detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 769;
        const deviceCSS = document.getElementById('device-css');

        if (isMobile) {
            // Load mobile CSS
            deviceCSS.href = 'assets/css/mobile.css';
            document.body.classList.add('mobile-device');
        } else {
            // Load desktop CSS
            deviceCSS.href = 'assets/css/desktop.css';
            document.body.classList.add('desktop-device');
        }
    }

    // Detect device on page load
    detectDevice();

    // Re-check on window resize (for orientation changes)
    window.addEventListener('resize', function () {
        // Debounce the resize event
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(detectDevice, 250);
    });
})();