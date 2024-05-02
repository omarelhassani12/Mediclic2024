function displayUploadedFiles(input) {
    const filesContainer = document.getElementById('uploadedFilesContainer');
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


