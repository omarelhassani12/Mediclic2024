

let currentCardIndex = 0;
const cards = ['first-card', 'second-card', 'third-card', 'fourth-card', 'fifth-card', 'sixth-card'];
const cardTitles = [
    'Vous avez un avis sur',
    'Vous prenez un rendez-vous pour',
    'Choisissez la mÃ©thode d\'avis',
    '',
    '',
    'Veuillez rÃ©pondre Ã  ces questions',
];
function showCard(index) {
    cards.forEach((cardId, i) => {
        const card = document.getElementById(cardId);
        card.style.display = (i === index) ? 'block' : 'none';
    });

    const cardHeaderTitle = document.getElementById('title-radio-1');
    cardHeaderTitle.textContent = cardTitles[index];
}



function handleThirdCardSelection() {
    const selectedRadio = document.querySelector('input[name="radio-g3"]:checked');
    if (selectedRadio) {
        const selectedViewId = `third-card-view-${selectedRadio.id.split('-')[2]}`;
        const thirdCardViews = document.querySelectorAll('.third-card-view');
        thirdCardViews.forEach(view => {
            view.style.display = (view.id === selectedViewId) ? 'flex' : 'none';
        });
        currentCardIndex++;
        showCard(currentCardIndex);
    }
}

function handleFifthCardSelection() {
    const selectedRadio = document.querySelector('input[name="radio-g4"]:checked');
    if (selectedRadio) {
        const selectedViewId = `fifth-card-view-${selectedRadio.id.split('-')[2]}`;
        const fifthCardViews = document.querySelectorAll('.fifth-card-view');
        fifthCardViews.forEach(view => {
            view.style.display = (view.id === selectedViewId) ? 'flex' : 'none';
        });
        currentCardIndex++;
        showCard(currentCardIndex);
    }
}

showCard(currentCardIndex);


            
document.addEventListener('DOMContentLoaded', () => {
const stepButtons = document.querySelectorAll('.step-button');
const progressBars = document.querySelectorAll('.progress-bar');
const progressX = document.getElementById('progressX');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');

    if (!stepButtons.length || !progressBars.length || !progressX || !nextButton || !prevButton) {
        console.error('One or more elements not found in the DOM');
        return;
    }

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
        console.log('Bouton Terminer cliquÃ©');
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





// for the drop and drag files

function displayUploadedFiles(input, targetContainerId) {
    const filesContainer = document.getElementById(targetContainerId);
    const files = input.files;

    if (files.length > 0) {
        const fileList = filesContainer.querySelector('.uploaded-files-list') || document.createElement('ul');
        fileList.classList.add('uploaded-files-list');

        for (let i = 0; i < files.length; i++) {
            const fileItem = document.createElement('li');
            fileItem.classList.add('file-item');

            const fileIcon = document.createElement('span');
            fileIcon.classList.add('file-icon');
            const fileType = getFileType(files[i].type);
            fileIcon.innerHTML = getIconHTML(fileType);

            const fileDetails = document.createElement('div');
            fileDetails.classList.add('file-details');

            const fileInfo = document.createElement('div');
            fileInfo.classList.add('file-info');

            const fileName = document.createElement('div');
            fileName.classList.add('file-name');
            fileName.textContent = files[i].name.length > 25 ? files[i].name.slice(0, 25) + '...' : files[i].name;
            fileInfo.appendChild(fileName);

            const fileSize = document.createElement('div');
            fileSize.classList.add('file-size');
            const fileSizeText = document.createElement('span');
            fileSizeText.textContent = '0 Bytes sur ' + formatFileSize(files[i].size);
            fileSize.appendChild(fileSizeText);
            fileInfo.appendChild(fileSize);

            const progressBarContainer = document.createElement('div');
            progressBarContainer.classList.add('progress-bar');
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress');
            progressBar.style.width = '0%';
            progressBarContainer.appendChild(progressBar);
            fileInfo.appendChild(progressBarContainer);

            const statusIcon = document.createElement('span');
            statusIcon.classList.add('status-icon');
            statusIcon.innerHTML = '<img src="../../img/icons/cancel.png">'; // Loading icon
            statusIcon.addEventListener('click', () => {
                fileItem.remove(); // Remove the file item when status icon is clicked
            });
            fileInfo.appendChild(statusIcon);

            fileDetails.appendChild(fileInfo);

            fileItem.appendChild(fileIcon);
            fileItem.appendChild(fileDetails);

            fileList.appendChild(fileItem);

            // Simulate file upload progress
            simulateFileUpload(files[i], progressBar, fileSizeText, statusIcon, fileItem, progressBarContainer);
        }

        // Append or update the file list in the container
        if (!filesContainer.querySelector('.uploaded-files-list')) {
            filesContainer.appendChild(fileList);
        }
    }
}




// for disply the size as 153Bytes sur 156Bytes
function simulateFileUpload(file, progressBar, fileSizeText, statusIcon, fileItem, progressBarContainer) {
    const fileSize = file.size;
    let uploadedBytes = 0;
    const progressInterval = setInterval(() => {
        uploadedBytes += fileSize / 100;
        const progressPercentage = Math.min(100, (uploadedBytes / fileSize) * 100);
        progressBar.style.width = progressPercentage + '%';

        if (progressPercentage >= 100) {
            clearInterval(progressInterval);
            statusIcon.innerHTML = '<img src="../../img/icons/delete.png">'; 
            progressBarContainer.style.display = 'none';
            fileItem.removeChild(statusIcon); 

            fileSizeText.textContent = formatFileSize(fileSize);
        } else {
            statusIcon.innerHTML = '<img src="../../img/icons/cancel.png">'; // Loading icon
            fileSizeText.textContent = formatFileSize(uploadedBytes) + ' sur ' + formatFileSize(fileSize);
        }
    }, 100);
}


function getFileType(mimeType) {
    const type = mimeType.split('/')[0];
    return type === 'image' ? 'image' : 'document';
}

function getIconHTML(fileType) {
    return fileType === 'image'
        ? '<img src="../../img/icons/img.png">'
        : '<img src="../../img/icons/docs.png">';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}






// for the files uploading
function displayUploadedFiles(input) {
    const filesContainer = document.getElementById('uploadedFilesContainer');
    const files = input.files;

    if (files.length > 0) {
        const fileList = document.createElement('ul');
        fileList.classList.add('uploaded-files-list');

        for (let i = 0; i < files.length; i++) {
            const fileItem = document.createElement('li');
            fileItem.classList.add('file-item');

            const fileIcon = document.createElement('span');
            fileIcon.classList.add('file-icon');
            const fileType = getFileType(files[i].type);
            fileIcon.innerHTML = getIconHTML(fileType);

            const fileDetails = document.createElement('div');
            fileDetails.classList.add('file-details');

            const fileInfo = document.createElement('div');
            fileInfo.classList.add('file-info');

            const fileName = document.createElement('div');
            fileName.classList.add('file-name');
            fileName.textContent = files[i].name.length > 25 ? files[i].name.slice(0, 25) + '...' : files[i].name;
            fileInfo.appendChild(fileName);

            const fileSize = document.createElement('div');
            fileSize.classList.add('file-size');
            const fileSizeText = document.createElement('span');
            fileSizeText.textContent = '0 Bytes sur ' + formatFileSize(files[i].size);
            fileSize.appendChild(fileSizeText);
            fileInfo.appendChild(fileSize);

            const progressBarContainer = document.createElement('div');
            progressBarContainer.classList.add('progress-bar');
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress');
            progressBar.style.width = '0%';
            progressBarContainer.appendChild(progressBar);
            fileInfo.appendChild(progressBarContainer);

            const statusIcon = document.createElement('span');
            statusIcon.classList.add('status-icon');
            statusIcon.innerHTML = '<img src="../../img/icons/cancel.png">';
            statusIcon.addEventListener('click', () => {
                fileItem.remove();
            });
            fileInfo.appendChild(statusIcon);

            fileDetails.appendChild(fileInfo);

            fileItem.appendChild(fileIcon);
            fileItem.appendChild(fileDetails);

            fileList.appendChild(fileItem);

            // Simulate file upload progress
            simulateFileUpload(files[i], progressBar, fileSizeText, statusIcon, fileItem, progressBarContainer);
        }

        // Append the file list to the container
        filesContainer.appendChild(fileList);
    }
}



// ////////////////////////////////////////////









/* Commenté par Badr
document.getElementById('accordionExample').addEventListener('change', (event) => {
    if (event.target.classList.contains('hidden-radio')) {
        const card = event.target.closest('.card-radio');
        const imgGroupClass = card.querySelector('.card-img').classList[1];
        const imgCheckedGroupClass = card.querySelector('.card-img-checked').classList[1];

        const allGroupImages = document.querySelectorAll(`.${imgGroupClass}`);
        const allCheckedGroupImages = document.querySelectorAll(`.${imgCheckedGroupClass}`);

        allGroupImages.forEach(img => img.style.display = 'block');
        allCheckedGroupImages.forEach(img => img.style.display = 'none');

        const cardImg = card.querySelector('.card-img');
        const cardImgChecked = card.querySelector('.card-img-checked');

        cardImg.style.display = 'none';
        cardImgChecked.style.display = 'block';
    }
});

*/
/* Fonction corrigé */
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



// document.addEventListener('DOMContentLoaded', () => {
    const waveContainer = document.getElementById('wave');
    const numberOfSpans = 60;

    if (waveContainer) {
        for (let i = 0; i < numberOfSpans; i++) {
            const span = document.createElement('span');
            span.style.animationDelay = `-${i * 0.19}s`;
            waveContainer.appendChild(span);
        }
    }

    const microphoneButton = document.getElementById('microphone');
    const audioContainer = document.getElementById('audio-container');
    const audioContainerRecording = document.getElementById('audio-container-recording');
    const playPauseButton = document.getElementById('play-pause-btn');
    const timerRecording = document.getElementById('timer-recording');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');

    if (!microphoneButton || !audioContainer || !audioContainerRecording || !playPauseButton || !timerRecording || !cancelBtn || !saveBtn) {
        console.error('One or more elements not found in the DOM');
        return;
    }

    let mediaRecorder;
    let audioChunks = [];
    let isRecordingPaused = false;
    let startTime = null;
    let timerInterval = null;
    let isRecordingSaved = false;

    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        timerRecording.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    async function saveRecording() {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const blobUrl = URL.createObjectURL(audioBlob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'recorded_audio.wav';
        a.click();
        window.URL.revokeObjectURL(blobUrl);
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                clearInterval(timerInterval);
                saveRecording();
                audioChunks = [];
                document.querySelectorAll('#wave span').forEach(span => {
                    span.style.animationPlayState = 'paused';
                });
                isRecordingSaved = true;
            });

            microphoneButton.addEventListener('click', () => {
                audioContainer.style.display = 'none';
                audioContainerRecording.style.display = 'flex';
                mediaRecorder.start();
                startTime = new Date().getTime();
                timerInterval = setInterval(updateTimer, 1000);
                isRecordingSaved = false;
            });

            playPauseButton.addEventListener('click', () => {
                if (isRecordingSaved) {
                    audioChunks = [];
                    startTime = null;
                    timerRecording.textContent = '00:00';
                    audioContainer.style.display = 'none';
                    audioContainerRecording.style.display = 'flex';
                    mediaRecorder.start();
                    startTime = new Date().getTime();
                    timerInterval = setInterval(updateTimer, 1000);
                    playPauseButton.querySelector('img').src = '../../img/icons/pause-icon.svg';
                    isRecordingSaved = false;
                    document.querySelectorAll('#wave span').forEach(span => {
                        span.style.animationPlayState = 'running';
                    });
                } else {
                    if (mediaRecorder.state === 'recording') {
                        mediaRecorder.pause();
                        clearInterval(timerInterval);
                        playPauseButton.querySelector('img').src = '../../img/icons/play-icon.svg';
                        document.querySelectorAll('#wave span').forEach(span => {
                            span.style.animationPlayState = 'paused';
                        });
                    } else if (mediaRecorder.state === 'paused') {
                        mediaRecorder.resume();
                        startTime = new Date().getTime() - (startTime - new Date().getTime());
                        timerInterval = setInterval(updateTimer, 1000);
                        playPauseButton.querySelector('img').src = '../../img/icons/pause-icon.svg';
                        document.querySelectorAll('#wave span').forEach(span => {
                            span.style.animationPlayState = 'running';
                        });
                    }
                }
            });

            cancelBtn.addEventListener('click', () => {
                audioContainer.style.display = 'flex';
                audioContainerRecording.style.display = 'none';
                mediaRecorder.stop();
                clearInterval(timerInterval);
                document.querySelectorAll('#wave span').forEach(span => {
                    span.style.animationPlayState = 'paused';
                });
            });

            saveBtn.addEventListener('click', () => {
                if (mediaRecorder.state !== 'inactive') {
                    mediaRecorder.stop();
                    clearInterval(timerInterval);
                    audioChunks = [];
                    startTime = null;
                    timerRecording.textContent = '00:00';
                    playPauseButton.querySelector('img').src = '../../img/icons/play-icon.svg';
                    isRecordingSaved = true;
                }
            });
        })
        .catch(error => {
            console.error('Error accessing audio input:', error);
        });

});