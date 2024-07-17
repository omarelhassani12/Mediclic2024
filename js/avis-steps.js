
document.addEventListener('DOMContentLoaded', function() {
    const accordion = document.getElementById('accordionExample');
    if (accordion) {
        accordion.addEventListener('change', (event) => {
            if (event.target.classList.contains('hidden-radio')) {
                const card = event.target.closest('.card-radio');
                if (card) {
                    const imgGroup = card.querySelector('.card-img');
                    const imgCheckedGroup = card.querySelector('.card-img-checked');

                    if (imgGroup && imgCheckedGroup) {
                        const imgGroupClass = imgGroup.classList[1];
                        const imgCheckedGroupClass = imgCheckedGroup.classList[1];

                        const allGroupImages = document.querySelectorAll(`.${imgGroupClass}`);
                        const allCheckedGroupImages = document.querySelectorAll(`.${imgCheckedGroupClass}`);

                        allGroupImages.forEach(img => img.style.display = 'block');
                        allCheckedGroupImages.forEach(img => img.style.display = 'none');

                        imgGroup.style.display = 'none';
                        imgCheckedGroup.style.display = 'block';
                    }
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {

    const selectListOpt = document.getElementById('selectListOpt');
    const selectListTitle = document.getElementById('selectList-title');

    document.getElementById('accordionExample').addEventListener('change', (event) => {
        if (event.target.id === 'radio2' && event.target.checked) {
            selectListOpt.style.display = 'block';
            selectListTitle.style.display = 'block';
        } else if (event.target.name === 'radio-g2') {
            selectListOpt.style.display = 'none';
            selectListTitle.style.display = 'none';
        }
    });
});

function navigateToSecondCardInFirstStep() {
    document.getElementById('title-radio-1').innerHTML = 'Vous prenez un rendez-vous pour'; 
    document.getElementById('first-card').style.display = 'none'; 
    document.getElementById('second-card').style.display = 'flex'; 
    document.getElementById('step-navigation-buttons').style.display = 'flex';
    document.getElementById('card-navigation-buttons').style.display = 'none';
}

function goBackToFirstCardInFirstStep() {
    document.getElementById('title-radio-1').innerHTML = 'Vous avez un avis sur'; 
    document.getElementById('first-card').style.display = 'flex'; 
    document.getElementById('second-card').style.display = 'none'; 
}



// for the third card
var radioButtons = document.querySelectorAll('input[name="radio-g3"]');

radioButtons.forEach(function(radioButton) {
radioButton.addEventListener('click', function() {
    navigateToNextCardInSecondStep();
});
});

function navigateToNextCardInSecondStep() {
document.getElementById('step-navigation-buttons').style.display = 'flex';

var selectedValue = document.querySelector('input[name="radio-g3"]:checked').value; 

document.getElementById('third-card').style.display = 'none';
document.getElementById('fourth-card').style.display = 'flex';

if (selectedValue === 'text') {
    document.getElementById('third-card-view-1').style.display = 'flex'; 
} else if (selectedValue === 'body') {
    document.getElementById('third-card-view-2').style.display = 'flex'; 
    document.getElementById('sexe-navigation-buttons').style.display = 'flex';
    document.getElementById('step-navigation-buttons').style.display = 'none';
    document.getElementById('card-navigation-buttons').style.display = 'none';
} else if (selectedValue === 'vocal') {
    document.getElementById('third-card-view-3').style.display = 'flex'; 
}
}



// for select homme or femme
var suivanteSexeButton = document.querySelector('.next-button-s');

suivanteSexeButton.addEventListener('click', function() {
navigateToNextCardInSecondeStep();
});

function navigateToNextCardInSecondeStep() {
document.getElementById('sexe-navigation-buttons').style.display = 'flex';

var selectedValueSexe = document.querySelector('input[name="radio-g4"]:checked').value; 

document.getElementById('third-card').style.display = 'none';
document.getElementById('fourth-card').style.display = 'none';
document.getElementById('fifth-card').style.display = 'flex';

if (selectedValueSexe === 'homme') {
    document.getElementById('fifth-card-view-1').style.display = 'flex';
    document.getElementById('step-navigation-buttons').style.display = 'flex';
    document.getElementById('sexe-navigation-buttons').style.display = 'none';
} else if (selectedValueSexe === 'femme') {
    document.getElementById('fifth-card-view-2').style.display = 'flex'; 
    document.getElementById('step-navigation-buttons').style.display = 'flex';
    document.getElementById('sexe-navigation-buttons').style.display = 'none';
}
}


const stepButtons = document.querySelectorAll('.step-button');
const progressBars = document.querySelectorAll('.progress-bar');
const progressX = document.getElementById('progressX');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const prevCardButton = document.querySelector('.prev-button-f');
const confirmationModal = new bootstrap.Modal(document.getElementById('ConfirmationDemandeModal'));


let stepStates = Array.from(stepButtons).fill(false);
let currentIndex = 0;

function updateProgress() {
const completedSteps = stepStates.filter(state => state).length;
const progressValue = (completedSteps) * 100;

progressBars.forEach((progressBar, index) => {
    progressBar.value = index <= currentIndex ? progressValue : 0;
    progressBar.setAttribute('value', progressBar.value);
});
}

function updateProgressX() {
const progressPerStep = 20;
const overallProgress = currentIndex * progressPerStep + 20;
progressX.value = overallProgress;
progressX.setAttribute('value', overallProgress);
}

function updateStepState(index, visited) {
const button = stepButtons[index];
const title = button.nextElementSibling;

if (visited) {
    button.classList.add('completed-step');
    title.classList.add('step-title-completed');
} else {
    button.classList.remove('completed-step');
    title.classList.remove('step-title-completed');
}

stepStates[index] = visited;
if (index > 0) {
    const prevIndex = index - 1;
    stepStates[prevIndex] = !visited; 
}
prevCardButton.style.display = index === 0 ? 'none' : 'flex';

}

// Initially mark the first step as incomplete
updateStepState(0, true);
updateProgress();
updateProgressX();

stepButtons.forEach((button, index) => {
button.addEventListener('click', () => {
    currentIndex = index;
    updateStepState(index, true);
    updateProgress();
    updateProgressX();
});
});


nextButton.addEventListener('click', () => {
    if (currentIndex < stepButtons.length - 1) {
        updateStepState(currentIndex, true);
        currentIndex++;
        stepButtons[currentIndex].click();
        updateProgress();
        updateProgressX();

        if (currentIndex === stepButtons.length - 1) {
            nextButton.textContent = 'Terminer';
        }
    } else {
        confirmationModal.show();
        console.log('Bouton Terminer cliqué');
    }
});

prevButton.addEventListener('click', () => {
if (currentIndex > 0) {
    let previousIndex = currentIndex;
    currentIndex--;
    stepButtons[currentIndex].click();
    updateStepState(previousIndex, false);
    if (currentIndex === 0) {
        prevButton.disabled = true;
    }
    nextButton.textContent = 'Suivante';
}
});

// document.addEventListener('DOMContentLoaded', function() {
//     const accordion = document.getElementById('accordionExample');
//     if (accordion) {
//         accordion.addEventListener('change', (event) => {
//             if (event.target.classList.contains('hidden-radio')) {
//                 const card = event.target.closest('.card-radio');
//                 if (card) {
//                     const imgGroup = card.querySelector('.card-img');
//                     const imgCheckedGroup = card.querySelector('.card-img-checked');

//                     if (imgGroup && imgCheckedGroup) {
//                         const imgGroupClass = imgGroup.classList[1];
//                         const imgCheckedGroupClass = imgCheckedGroup.classList[1];

//                         const allGroupImages = document.querySelectorAll(`.${imgGroupClass}`);
//                         const allCheckedGroupImages = document.querySelectorAll(`.${imgCheckedGroupClass}`);

//                         allGroupImages.forEach(img => img.style.display = 'block');
//                         allCheckedGroupImages.forEach(img => img.style.display = 'none');

//                         imgGroup.style.display = 'none';
//                         imgCheckedGroup.style.display = 'block';
//                     }
//                 }
//             }
//         });
//     }

//     const selectListOpt = document.getElementById('selectListOpt');
//     const selectListTitle = document.getElementById('selectList-title');

//     if (accordion) {
//         accordion.addEventListener('change', (event) => {
//             if (event.target.id === 'radio2' && event.target.checked) {
//                 selectListOpt.style.display = 'block';
//                 selectListTitle.style.display = 'block';
//             } else if (event.target.name === 'radio-g2') {
//                 selectListOpt.style.display = 'none';
//                 selectListTitle.style.display = 'none';
//             }
//         });
//     }

//     const radioButtons = document.querySelectorAll('input[name="radio-g3"]');
//     radioButtons.forEach(function(radioButton) {
//         radioButton.addEventListener('click', function() {
//             navigateToNextCardInSecondStep();
//         });
//     });

//     const suivanteSexeButton = document.querySelector('.next-button-s');
//     if (suivanteSexeButton) {
//         suivanteSexeButton.addEventListener('click', function() {
//             navigateToNextCardInSecondStep();
//         });
//     }

//     const stepButtons = document.querySelectorAll('.step-button');
//     const progressBars = document.querySelectorAll('.progress-bar');
//     const progressX = document.getElementById('progressX');
//     const nextButton = document.querySelector('.next-button');
//     const prevButton = document.querySelector('.prev-button');
//     const prevCardButton = document.querySelector('.prev-button-f');
//     const confirmationModal = new bootstrap.Modal(document.getElementById('ConfirmationDemandeModal'));

//     let stepStates = Array.from(stepButtons).fill(false);
//     let currentIndex = 0;

//     function updateProgress() {
//         const completedSteps = stepStates.filter(state => state).length;
//         const progressValue = (completedSteps) * 100;

//         progressBars.forEach((progressBar, index) => {
//             progressBar.value = index <= currentIndex ? progressValue : 0;
//             progressBar.setAttribute('value', progressBar.value);
//         });
//     }

//     function updateProgressX() {
//         const progressPerStep = 20;
//         const overallProgress = currentIndex * progressPerStep + 20;
//         progressX.value = overallProgress;
//         progressX.setAttribute('value', overallProgress);
//     }

//     function updateStepState(index, visited) {
//         const button = stepButtons[index];
//         const title = button.nextElementSibling;

//         if (visited) {
//             button.classList.add('completed-step');
//             title.classList.add('step-title-completed');
//         } else {
//             button.classList.remove('completed-step');
//             title.classList.remove('step-title-completed');
//         }

//         stepStates[index] = visited;
//         if (index > 0) {
//             const prevIndex = index - 1;
//             stepStates[prevIndex] = !visited; 
//         }
//         prevCardButton.style.display = index === 0 ? 'none' : 'flex';
//     }

//     updateStepState(0, true);
//     updateProgress();
//     updateProgressX();

//     stepButtons.forEach((button, index) => {
//         button.addEventListener('click', () => {
//             currentIndex = index;
//             updateStepState(index, true);
//             updateProgress();
//             updateProgressX();
//         });
//     });

//     nextButton.addEventListener('click', () => {
//         if (currentIndex < stepButtons.length - 1) {
//             updateStepState(currentIndex, true);
//             currentIndex++;
//             stepButtons[currentIndex].click();
//             updateProgress();
//             updateProgressX();

//             if (currentIndex === stepButtons.length - 1) {
//                 nextButton.textContent = 'Terminer';
//             }
//         } else {
//             confirmationModal.show();
//             console.log('Bouton Terminer cliqué');
//         }
//     });

//     prevButton.addEventListener('click', () => {
//         if (currentIndex > 0) {
//             let previousIndex = currentIndex;
//             currentIndex--;
//             stepButtons[currentIndex].click();
//             updateStepState(previousIndex, false);
//             if (currentIndex === 0) {
//                 prevButton.disabled = true;
//             }
//             nextButton.textContent = 'Suivante';
//         }
//     });
// });

// function navigateToSecondCardInFirstStep() {
//     document.getElementById('title-radio-1').innerHTML = 'Vous prenez un rendez-vous pour'; 
//     document.getElementById('first-card').style.display = 'none'; 
//     document.getElementById('second-card').style.display = 'flex'; 
//     document.getElementById('step-navigation-buttons').style.display = 'flex';
//     document.getElementById('card-navigation-buttons').style.display = 'none';
// }

// function goBackToFirstCardInFirstStep() {
//     document.getElementById('title-radio-1').innerHTML = 'Vous avez un avis sur'; 
//     document.getElementById('first-card').style.display = 'flex'; 
//     document.getElementById('second-card').style.display = 'none'; 
// }

// function navigateToNextCardInSecondStep() {
//     document.getElementById('step-navigation-buttons').style.display = 'flex';

//     var selectedValue = document.querySelector('input[name="radio-g3"]:checked').value; 

//     document.getElementById('third-card').style.display = 'none';
//     document.getElementById('fourth-card').style.display = 'flex';

//     if (selectedValue === 'text') {
//         document.getElementById('third-card-view-1').style.display = 'flex'; 
//     } else if (selectedValue === 'body') {
//         document.getElementById('third-card-view-2').style.display = 'flex'; 
//         document.getElementById('sexe-navigation-buttons').style.display = 'flex';
//         document.getElementById('step-navigation-buttons').style.display = 'none';
//         document.getElementById('card-navigation-buttons').style.display = 'none';
//     } else if (selectedValue === 'vocal') {
//         document.getElementById('third-card-view-3').style.display = 'flex'; 
//     }
// }

// function navigateToNextCardInSecondeStep() {
//     document.getElementById('sexe-navigation-buttons').style.display = 'flex';

//     var selectedValueSexe = document.querySelector('input[name="radio-g4"]:checked').value; 

//     document.getElementById('third-card').style.display = 'none';
//     document.getElementById('fourth-card').style.display = 'none';
//     document.getElementById('fifth-card').style.display = 'flex';

//     if (selectedValueSexe === 'homme') {
//         document.getElementById('fifth-card-view-1').style.display = 'flex';
//         document.getElementById('step-navigation-buttons').style.display = 'flex';
//         document.getElementById('sexe-navigation-buttons').style.display = 'none';
//     } else if (selectedValueSexe === 'femme') {
//         document.getElementById('fifth-card-view-2').style.display = 'flex'; 
//         document.getElementById('step-navigation-buttons').style.display = 'flex';
//         document.getElementById('sexe-navigation-buttons').style.display = 'none';
//     }
// }
