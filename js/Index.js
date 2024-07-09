import { renderDatas, reloadWidgets } from '/js/renders/Index.js';


renderDatas();



document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;


    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.textContent = '🌙';
            reloadWidgets('dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.textContent = '☀️';
            reloadWidgets('light');
        }
    });

    reloadWidgets('light'); // Initial load with light theme
});
