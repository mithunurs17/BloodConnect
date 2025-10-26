// theme.js - Theme Toggle Functionality

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const htmlElement = document.documentElement;
    const body = document.body;

    // Check for saved theme preference or default to light theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        updateThemeUI(true);
    } else {
        body.classList.remove('dark-theme');
        updateThemeUI(false);
    }

    // Theme toggle button click handler
    themeToggle.addEventListener('click', function () {
        const isDarkTheme = body.classList.toggle('dark-theme');
        
        // Save the theme preference
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        // Update UI
        updateThemeUI(isDarkTheme);
    });

    // Update theme UI elements
    function updateThemeUI(isDark) {
        if (isDark) {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        }
    }

    // Optional: Detect system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // User prefers dark theme, but only apply if no saved preference
        if (!localStorage.getItem('theme')) {
            body.classList.add('dark-theme');
            updateThemeUI(true);
        }
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            // Only auto-switch if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    body.classList.add('dark-theme');
                    updateThemeUI(true);
                } else {
                    body.classList.remove('dark-theme');
                    updateThemeUI(false);
                }
            }
        });
    }
});

