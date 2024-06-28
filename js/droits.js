

function toggleDropdown(contentId, iconId) {
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);
    if (content && icon) {
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
            icon.classList.add("rotate-icon");
        } else {
            content.style.display = "none";
            icon.classList.remove("rotate-icon");
        }
    } else {
        console.error(`Element with ID ${contentId} or ${iconId} not found.`);
    }
}

function toggleAllCheckboxes(checkbox) {
    var checkboxes = document.querySelectorAll('.toggle-checkbox');
    checkboxes.forEach(function (box) {
        box.checked = checkbox.checked;
    });
    // Update counters for all sections
    document.querySelectorAll('.message-center').forEach(section => {
        const sectionId = section.id;
        updateActiveCounter(sectionId);
    });
}

function updateActiveCounter(sectionId) {
    const toggleCheckboxes = document.querySelectorAll(`#${sectionId} .toggle-checkbox`);
    const totalCheckboxes = toggleCheckboxes.length;
    let activeCount = 0;
    toggleCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            activeCount++;
        }
    });
    const counterElement = document.getElementById(`${sectionId}-active-counter`);
    if (counterElement) {
        counterElement.textContent = `${activeCount}/${totalCheckboxes}`;
    } else {
        console.error(`Element with ID ${sectionId}-active-counter not found.`);
    }
}

document.querySelectorAll('.message-center').forEach(section => {
    const sectionId = section.id;
    const toggleCheckboxes = section.querySelectorAll('.toggle-checkbox');
    toggleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => updateActiveCounter(sectionId));
    });
    updateActiveCounter(sectionId);
});
