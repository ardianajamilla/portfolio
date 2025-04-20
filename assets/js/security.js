// Anti-Inspection Protection System - Without Alert Popups
(function () {
    // Store original console methods
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
        debug: console.debug,
        clear: console.clear
    };

    // Disable console methods
    function disableConsole() {
        console.log = console.warn = console.error = console.info = console.debug = function () { };
        console.clear = function () {
            originalConsole.clear.apply(console);
            consoleWarning();
        };
    }

    // Console warning message on attempt
    function consoleWarning() {
        setTimeout(() => {
            console.log = originalConsole.log;
            console.log('%cStop!', 'color: red; font-size: 30px; font-weight: bold;');
            console.log('%cThis is a protected website. Unauthorized access or inspection attempts are being logged.', 'font-size: 18px;');
            console.log = function () { };
        }, 10);
    }

    // Detect DevTools opening
    function detectDevTools() {
        // Method 1: Window size detection
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            handleDevToolsOpen();
            return true;
        }

        // Method 2: Debug oriented CSS
        if (window.devicePixelRatio % 1 !== 0 ||
            window.outerWidth % 1 !== 0 ||
            window.outerHeight % 1 !== 0) {
            handleDevToolsOpen();
            return true;
        }

        // Method 3: Timing attack
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
            handleDevToolsOpen();
            return true;
        }

        return false;
    }

    // Handle DevTools opening - silent logging only, no alert
    function handleDevToolsOpen() {
        // Just log the attempt, no visible alert
        logSecurityEvent('debugging-attempt');
    }

    // Detect right-click and keyboard shortcuts
    function preventInspection() {
        // Disable right-click
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            logSecurityEvent('right-click-attempt');
            return false;
        });

        // Disable keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            // F12 key
            if (e.key === 'F12') {
                e.preventDefault();
                logSecurityEvent('f12-key-attempt');
                return false;
            }

            // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
                e.preventDefault();
                logSecurityEvent('inspector-shortcut-attempt');
                return false;
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                logSecurityEvent('view-source-attempt');
                return false;
            }
        });
    }

    // Log security event
    function logSecurityEvent(type) {
        if (navigator.sendBeacon) {
            const data = new FormData();
            data.append('event', type);
            data.append('page', window.location.href);
            data.append('timestamp', new Date().toISOString());
            data.append('userAgent', navigator.userAgent);

            // Send to logging endpoint (implement server-side)
            navigator.sendBeacon('/api/security-log', data);
        }
    }

    // Anti-debugging timer
    function setAntiDebuggingTimer() {
        let lastTime = new Date();
        let checkCount = 0;

        setInterval(() => {
            const currentTime = new Date();
            const deltaTime = currentTime - lastTime;

            // If time difference is significantly greater than interval,
            // debugging/breakpoint might have been used
            if (deltaTime > 200) {
                handleDevToolsOpen();
            }

            lastTime = currentTime;

            // Occasionally run detect function
            if (++checkCount % 10 === 0) {
                detectDevTools();
            }
        }, 100);
    }

    // Initialize protections
    function initSecurity() {
        // Apply protections
        disableConsole();
        preventInspection();
        setAntiDebuggingTimer();

        // Check for DevTools periodically
        setInterval(detectDevTools, 1000);

        // Add obfuscation layer
        window._securityToken = Math.random().toString(36).substring(2);
    }

    // Start security measures
    window.addEventListener('load', initSecurity);

    // Additional layer - detect if script is being examined
    if (new Error().stack.includes('toString')) {
        console.clear();
        consoleWarning();
    }
})();