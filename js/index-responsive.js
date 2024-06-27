document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle dropdown menu when the toggle button is clicked
    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        dropdownMenu.classList.toggle('show');
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', function(event) {
        const targetElement = event.target;
        const isClickInsideDropdown = dropdownMenu.contains(targetElement);
        const isClickOnToggle = dropdownToggle.contains(targetElement);

        if (!isClickInsideDropdown && !isClickOnToggle) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Hide the dropdown when clicking on it
    dropdownMenu.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const profilePhoto = document.querySelector('.photo-profil-mobile');
    const userNameMobile = document.querySelector('.user-name-mobile');

    profilePhoto.addEventListener('click', function() {
        if (userNameMobile.style.display === 'none' || userNameMobile.style.display === '') {
            userNameMobile.style.display = 'block';
        } else {
            userNameMobile.style.display = 'none';
        }
    });
});

