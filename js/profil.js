// toggle for the button of disply all text
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

// toggle for the edit
function toggleVisibilitySingle(buttonId, targetId) {
    const button = document.getElementById(buttonId);
    const target = document.getElementById(targetId);

    if (!button || !target) {
        console.error("Button or target element not found.");
        return;
    }

    button.addEventListener("click", function() {
        target.classList.toggle("hidden");
    });
}

function toggleVisibilityMultiple(buttonId, targetIds) {
    const button = document.getElementById(buttonId);
    const targets = targetIds.map(id => document.getElementById(id)).filter(Boolean);

    if (!button || targets.length === 0) {
        console.error("Button or target elements not found.");
        return;
    }

    button.addEventListener("click", function() {
        targets.forEach(target => {
            target.classList.toggle("hidden");
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    toggleVisibilitySingle("modifierlanguesButton", "newlanguesInput");
    toggleVisibilitySingle("modifierPaymentButton", "newPaymentInput");

    toggleVisibilityMultiple("ModifierGalerieButton", ["supprimerButton1", "supprimerButton2", "supprimerButton3", "supprimerButton4", "supprimerButton5", "supprimerButton6", "uploadedFilesContainer"]);
});
