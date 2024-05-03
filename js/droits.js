function toggleAllCheckboxes(checkbox) {
    var checkboxes = document.querySelectorAll('.toggle-checkbox');
    checkboxes.forEach(function (box) {
        box.checked = checkbox.checked;
    });
}