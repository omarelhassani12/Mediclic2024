function toggleFullText() {
    var paragraph = document.getElementById("full-text");
    var shadow = document.querySelector(".shadow-bottom");

    if (paragraph.style.maxHeight) {
        paragraph.style.maxHeight = null;
        shadow.classList.remove("toggle-shadow");
    } else {
        paragraph.style.maxHeight = paragraph.scrollHeight + "px";
        shadow.classList.add("toggle-shadow");
    }
}
