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
        button.setAttribute('aria-expanded', 'true'); // Always set aria-expanded to 'true'
        button.classList.add('completed-step'); // Add a class for completed step styling
    } else {
        numberSpan.style.display = 'inline-block'; // Display the hidden number span
        checkIcon.style.display = 'none'; // Hide the check icon
        button.setAttribute('aria-expanded', 'true'); // Always set aria-expanded to 'true'
        button.classList.remove('completed-step'); // Remove completed step styling
    }
}

// Set initial state for all steps
Array.from(stepButtons).forEach((button, index) => {
    updateStepState(index, false); // Initialize all steps as default style
});

// Set initial state for the first step as completed
updateStepState(0, true);
updateProgress(); // Update progress bar

// Event listener for step buttons
Array.from(stepButtons).forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log('Step button clicked:', index); // Log the click event
        currentIndex = index; // Update current index
        const visited = stepStates[index];
        if (!visited) {
            // Mark current step as completed only if it's not already visited
            updateStepState(index, true);
            updateProgress();
        }
    });
});

// Écouteur d'événements pour le bouton suivant (nextButton)
nextButton.addEventListener('click', () => {
    if (currentIndex < stepButtons.length - 1) {
        currentIndex++; // Incrémenter l'index actuel
        updateStepState(currentIndex, false); // Marquer l'étape actuelle comme style par défaut
        stepButtons[currentIndex].click(); // Déclencher le clic sur l'étape suivante
        updateProgress(); // Mettre à jour la barre de progression

        // Vérifier si l'étape suivante est la dernière étape
        if (currentIndex === stepButtons.length - 1) {
            // Modifier le texte du bouton suivant
            nextButton.textContent = 'Terminer'; // Modifier par 'Terminer' ou tout autre texte désiré
        }
    } else {
        // Gérer l'action du bouton Terminer ici
        // Par exemple, afficher un message de réalisation ou naviguer vers une autre page
        console.log('Bouton Terminer cliqué');
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

