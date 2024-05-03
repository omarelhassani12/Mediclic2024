function toggleAllCheckboxes(checkbox) {
    var checkboxes = document.querySelectorAll('.toggle-checkbox');
    checkboxes.forEach(function (box) {
        box.checked = checkbox.checked;
    });
}

// for the count of the checkboxe toggled
function updateActiveCounter(sectionId) {
    const toggleCheckboxes = document.querySelectorAll(`#${sectionId} .toggle-checkbox`);
    const totalCheckboxes = toggleCheckboxes.length;
    let activeCount = 0;
    toggleCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            activeCount++;
        }
    });
    document.getElementById(`${sectionId}-active-counter`).textContent = `${activeCount}/${totalCheckboxes}`;
}

document.querySelectorAll('.message-center').forEach(section => {
    const sectionId = section.id;
    const toggleCheckboxes = section.querySelectorAll('.toggle-checkbox');
    toggleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => updateActiveCounter(sectionId));
    });
    updateActiveCounter(sectionId);
});