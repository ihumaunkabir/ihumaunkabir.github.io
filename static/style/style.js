(function() {
    'use strict';

    var STORAGE_KEY = 'theme-preference';
    var DARK = 'dark';
    var LIGHT = 'light';

    function getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    }

    function getStoredPreference() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', theme === DARK ? '#111111' : '#ffffff');
        }
    }

    function init() {
        var stored = getStoredPreference();
        var system = getSystemPreference();
        var theme = stored || system;
        applyTheme(theme);

        var toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', function() {
                var current = document.documentElement.getAttribute('data-theme') || LIGHT;
                var next = current === DARK ? LIGHT : DARK;
                applyTheme(next);
                try {
                    localStorage.setItem(STORAGE_KEY, next);
                } catch (e) {}
            });
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!getStoredPreference()) {
                applyTheme(e.matches ? DARK : LIGHT);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
