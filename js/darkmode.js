// Dark Mode - NexGenTech
(function() {
    const TOGGLE_ID = 'darkToggle';
    const STORAGE_KEY = 'darkMode';

    function initDarkMode() {
        const toggle = document.getElementById(TOGGLE_ID);
        if (!toggle) return;

        // Aplicar tema guardado o preferencia del sistema
        const saved = localStorage.getItem(STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (saved === 'true' || (saved === null && prefersDark)) {
            document.body.classList.add('dark');
        }

        updateIcon();

        toggle.addEventListener('click', toggleDarkMode);
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        localStorage.setItem(STORAGE_KEY, document.body.classList.contains('dark'));
        updateIcon();
    }

    function updateIcon() {
        const toggle = document.getElementById(TOGGLE_ID);
        if (!toggle) return;
        const icon = toggle.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('dark')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // Escuchar cambios de preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem(STORAGE_KEY) === null) {
            document.body.classList.toggle('dark', e.matches);
            updateIcon();
        }
    });

    document.addEventListener('DOMContentLoaded', initDarkMode);
})();