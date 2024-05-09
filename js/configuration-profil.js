const stepButtons = document.querySelectorAll('.step-button');
const progress = document.querySelector('#progress');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');

// Initialize step states and current index
let stepStates = Array.from(stepButtons).map(() => false);
let currentIndex = 0;

// Update progress based on visited steps
function updateProgress() {
    const totalSteps = stepButtons.length - 1; // Total steps excluding the first step
    progress.setAttribute('value', (currentIndex / totalSteps) * 100);
}

// Update step state and UI
function updateStepState(index, visited) {
    stepStates[index] = visited;
    const button = stepButtons[index];
    const numberSpan = button.querySelector('.text-hidden');
    const checkIcon = button.querySelector('.step-done');

    if (visited) {
        numberSpan.style.display = 'none'; // Hide the hidden number span
        checkIcon.style.display = 'inline-block'; // Display the check icon
        button.setAttribute('aria-expanded', 'true'); // Mark step as expanded
        button.classList.add('completed-step'); // Add a class for completed step styling
    } else {
        numberSpan.style.display = 'inline-block'; // Display the hidden number span
        checkIcon.style.display = 'none'; // Hide the check icon
        button.setAttribute('aria-expanded', 'false'); // Mark step as collapsed
        button.classList.remove('completed-step'); // Remove completed step styling
    }

}


// Event listeners for step buttons
Array.from(stepButtons).forEach((button, index) => {
    button.addEventListener('click', () => {
        currentIndex = index; // Update current index
        const visited = stepStates[index];
        if (!visited) {
            // Mark current step as completed only if it's not already visited
            updateStepState(index, true);
            updateProgress();
        }
    });
});

// Next button event listener
nextButton.addEventListener('click', () => {
    if (currentIndex < stepButtons.length - 1) {
        currentIndex++; // Increment current index
        updateStepState(currentIndex, false); // Mark current step as default style
        stepButtons[currentIndex].click(); // Trigger click on next step
        updateProgress(); // Update progress bar
    }
});

// Previous button event listener
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        updateStepState(currentIndex, false); // Mark current step as default style
        stepButtons[currentIndex].classList.remove('completed-step'); // Remove completed-step class
        currentIndex--; // Decrement current index
        stepButtons[currentIndex].click(); // Trigger click on previous step
        updateProgress(); // Update progress bar
    }
});


// Set initial state for the first step
updateStepState(0, true);


