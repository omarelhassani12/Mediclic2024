document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggleBtn').addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        if (sidebar.classList.contains('small')) {
            sidebar.classList.remove('small');
            mainContent.classList.remove('small');
        } else {
            sidebar.classList.add('small');
            mainContent.classList.add('small');
        }
    });
});