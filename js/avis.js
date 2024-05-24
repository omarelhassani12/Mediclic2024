const stepButtons = document.querySelectorAll('.step-button');
const progressBars = document.querySelectorAll('.progress-bar');
const progressX = document.getElementById('progressX');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');

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





// for the radio button click


const radioButtons = document.querySelectorAll('.hidden-radio');
   


radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        const card = radioButton.closest('.card-radio');
        const imgGroupClass = card.querySelector('.card-img').classList[1]; // Get second class name which indicates group
        const imgCheckedGroupClass = card.querySelector('.card-img-checked').classList[1]; // Get second class name which indicates checked group

        const allGroupImages = document.querySelectorAll(`.${imgGroupClass}`);
        const allCheckedGroupImages = document.querySelectorAll(`.${imgCheckedGroupClass}`);

        // Reset all images in the group
        allGroupImages.forEach(img => img.style.display = 'block');
        allCheckedGroupImages.forEach(img => img.style.display = 'none');

        // Show the checked image for the selected radio button
        const cardImg = card.querySelector('.card-img');
        const cardImgChecked = card.querySelector('.card-img-checked');

        cardImg.style.display = 'none';
        cardImgChecked.style.display = 'block';
    });
});

// some update for the first card in the steps to disply two substeps
function showSecondCard() {
    document.getElementById('first-card').style.display = 'none';
    document.getElementById('second-card').style.display = 'block';
    document.getElementById('title-radio-1').style.display = 'none';
    document.getElementById('title-radio-2').style.display = 'block';
    
    document.getElementById('navigation-buttons-first').style.display = 'none';
    document.getElementById('navigation-buttons-second').style.display = 'flex';
    
}

function showFirstCard() {
    document.getElementById('first-card').style.display = 'block';
    document.getElementById('second-card').style.display = 'none';
    document.getElementById('title-radio-1').style.display = 'block';
    document.getElementById('title-radio-2').style.display = 'none';
    
    
    document.getElementById('navigation-buttons-first').style.display = 'flex';
    document.getElementById('navigation-buttons-second').style.display = 'none';
}



const selectListOpt = document.getElementById('selectListOpt');
const selectListTitle  = document.getElementById('selectList-title');
        
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        if (radioButton.id === 'radio2' && radioButton.checked) {
            selectListOpt.style.display = 'block';
            selectListTitle.style.display = 'block';
        } else {
            selectListOpt.style.display = 'none';
            selectListTitle.style.display = 'none';
        }
    });
});


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