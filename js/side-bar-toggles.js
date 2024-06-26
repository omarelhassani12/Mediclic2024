document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.querySelector('.toggle-button');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleImgLeft = document.querySelector('.toggle-img-left');
    const toggleImgRight = document.querySelector('.toggle-img-right');

    if (toggleBtn && sidebar && mainContent && toggleImgLeft && toggleImgRight) {
        toggleBtn.addEventListener('click', function() {
            if (sidebar.classList.contains('small')) {
                sidebar.classList.remove('small');
                mainContent.classList.remove('small');
                toggleImgLeft.classList.remove('hidden');
                toggleImgRight.classList.add('hidden');
            } else {
                sidebar.classList.add('small');
                mainContent.classList.add('small');
                toggleImgLeft.classList.add('hidden');
                toggleImgRight.classList.remove('hidden');
            }
        });
    } else {
        console.log("One or more elements not found in the DOM.");
    }
});