// for wavefrom and recoreing audio formats



// document.addEventListener('DOMContentLoaded', () => {
//     const waveContainer = document.querySelector('.wave');
//     const numberOfSpans = 60;
    
//     for (let i = 0; i < numberOfSpans; i++) {
//         const span = document.createElement('span');
//         span.style.animationDelay = `-${i * 0.19}s`;
//         waveContainer.appendChild(span);
//     }

//     const microphoneButton = document.querySelector('.audio-container .microphone');
//     const audioContainer = document.querySelector('.audio-container');
//     const audioContainerRecording = document.querySelector('.audio-container-recording');
//     const playPauseButton = document.querySelector('.play-pause-btn');
//     const timerRecording = document.querySelector('.timer-recording');
//     const cancelBtn = document.getElementById('cancel-btn');
//     const saveBtn = document.getElementById('save-btn');

//     let mediaRecorder;
//     let audioChunks = [];
//     let isRecordingPaused = false;
//     let startTime = null;
//     let timerInterval = null;
//     let isRecordingSaved = false;

//     function updateTimer() {
//         const currentTime = new Date().getTime();
//         const elapsedTime = currentTime - startTime;
//         const minutes = Math.floor(elapsedTime / 60000);
//         const seconds = Math.floor((elapsedTime % 60000) / 1000);
//         timerRecording.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     }

//     async function saveRecording() {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//         const blobUrl = URL.createObjectURL(audioBlob);

//         const a = document.createElement('a');
//         a.href = blobUrl;
//         a.download = 'recorded_audio.wav';
//         a.click();
//         window.URL.revokeObjectURL(blobUrl);
//     }

//     navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//             mediaRecorder = new MediaRecorder(stream);

//             mediaRecorder.addEventListener('dataavailable', event => {
//                 audioChunks.push(event.data);
//             });

//             mediaRecorder.addEventListener('stop', () => {
//                 clearInterval(timerInterval);
//                 saveRecording();
//                 audioChunks = [];
//                 document.querySelectorAll('.wave span').forEach(span => {
//                     span.style.animationPlayState = 'paused';
//                 });
//                 isRecordingSaved = true;
//             });

//             microphoneButton.addEventListener('click', () => {
//                 audioContainer.style.display = 'none';
//                 audioContainerRecording.style.display = 'flex';
//                 mediaRecorder.start();
//                 startTime = new Date().getTime();
//                 timerInterval = setInterval(updateTimer, 1000);
//                 isRecordingSaved = false;
//             });

//             playPauseButton.addEventListener('click', () => {
//                 if (isRecordingSaved) {
//                     audioChunks = [];
//                     startTime = null;
//                     timerRecording.textContent = '00:00';
//                     audioContainer.style.display = 'none';
//                     audioContainerRecording.style.display = 'flex';
//                     mediaRecorder.start();
//                     startTime = new Date().getTime();
//                     timerInterval = setInterval(updateTimer, 1000);
//                     playPauseButton.querySelector('img').src = '../../img/icons/pause-icon.svg';
//                     isRecordingSaved = false;
//                     document.querySelectorAll('.wave span').forEach(span => {
//                         span.style.animationPlayState = 'running';
//                     });
//                 } else {
//                     if (mediaRecorder.state === 'recording') {
//                         mediaRecorder.pause();
//                         clearInterval(timerInterval);
//                         playPauseButton.querySelector('img').src = '../../img/icons/play-icon.svg';
//                         document.querySelectorAll('.wave span').forEach(span => {
//                             span.style.animationPlayState = 'paused';
//                         });
//                     } else if (mediaRecorder.state === 'paused') {
//                         mediaRecorder.resume();
//                         startTime = new Date().getTime() - (startTime - new Date().getTime());
//                         timerInterval = setInterval(updateTimer, 1000);
//                         playPauseButton.querySelector('img').src = '../../img/icons/pause-icon.svg';
//                         document.querySelectorAll('.wave span').forEach(span => {
//                             span.style.animationPlayState = 'running';
//                         });
//                     }
//                 }
//             });

//             cancelBtn.addEventListener('click', () => {
//                 audioContainer.style.display = 'flex';
//                 audioContainerRecording.style.display = 'none';
//                 mediaRecorder.stop();
//                 clearInterval(timerInterval);
//                 document.querySelectorAll('.wave span').forEach(span => {
//                     span.style.animationPlayState = 'paused';
//                 });
//             });

//             saveBtn.addEventListener('click', () => {
//                 if (mediaRecorder.state !== 'inactive') {
//                     mediaRecorder.stop();
//                     clearInterval(timerInterval);
//                     audioChunks = [];
//                     startTime = null;
//                     timerRecording.textContent = '00:00';
//                     playPauseButton.querySelector('img').src = '../../img/icons/play-icon.svg';
//                     isRecordingSaved = true;
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Error accessing audio input:', error);
//         });
// });



// document.addEventListener('DOMContentLoaded', () => {
//     const waveContainer = document.getElementById('wave');
//     const numberOfSpans = 60;

//     if (waveContainer) {
//         for (let i = 0; i < numberOfSpans; i++) {
//             const span = document.createElement('span');
//             span.style.animationDelay = `-${i * 0.19}s`;
//             waveContainer.appendChild(span);
//         }
//     }

//     const microphoneButton = document.getElementById('microphone');
//     const audioContainer = document.getElementById('audio-container');
//     const audioContainerRecording = document.getElementById('audio-container-recording');
//     const playPauseButton = document.getElementById('play-pause-btn');
//     const timerRecording = document.getElementById('timer-recording');
//     const cancelBtn = document.getElementById('cancel-btn');
//     const saveBtn = document.getElementById('save-btn');

//     if (!microphoneButton || !audioContainer || !audioContainerRecording || !playPauseButton || !timerRecording || !cancelBtn || !saveBtn) {
//         console.error('One or more elements not found in the DOM');
//         return;
//     }

//     let mediaRecorder;
//     let audioChunks = [];
//     let isRecordingPaused = false;
//     let startTime = null;
//     let timerInterval = null;
//     let isRecordingSaved = false;

//     function updateTimer() {
//         const currentTime = new Date().getTime();
//         const elapsedTime = currentTime - startTime;
//         const minutes = Math.floor(elapsedTime / 60000);
//         const seconds = Math.floor((elapsedTime % 60000) / 1000);
//         timerRecording.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     }

//     async function saveRecording() {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//         const blobUrl = URL.createObjectURL(audioBlob);

//         const a = document.createElement('a');
//         a.href = blobUrl;
//         a.download = 'recorded_audio.wav';
//         a.click();
//         window.URL.revokeObjectURL(blobUrl);
//     }

//     navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//             mediaRecorder = new MediaRecorder(stream);

//             mediaRecorder.addEventListener('dataavailable', event => {
//                 audioChunks.push(event.data);
//             });

//             mediaRecorder.addEventListener('stop', () => {
//                 clearInterval(timerInterval);
//                 saveRecording();
//                 audioChunks = [];
//                 document.querySelectorAll('#wave span').forEach(span => {
//                     span.style.animationPlayState = 'paused';
//                 });
//                 isRecordingSaved = true;
//             });

//             microphoneButton.addEventListener('click', () => {
//                 audioContainer.style.display = 'none';
//                 audioContainerRecording.style.display = 'flex';
//                 mediaRecorder.start();
//                 startTime = new Date().getTime();
//                 timerInterval = setInterval(updateTimer, 1000);
//                 isRecordingSaved = false;
//             });

//             playPauseButton.addEventListener('click', () => {
//                 if (isRecordingSaved) {
//                     audioChunks = [];
//                     startTime = null;
//                     timerRecording.textContent = '00:00';
//                     audioContainer.style.display = 'none';
//                     audioContainerRecording.style.display = 'flex';
//                     mediaRecorder.start();
//                     startTime = new Date().getTime();
//                     timerInterval = setInterval(updateTimer, 1000);
//                     playPauseButton.querySelector('img').src = '../../img/icons/pause-icon.svg';
//                     isRecordingSaved = false;
//                     document.querySelectorAll('#wave span').forEach(span => {
//                         span.style.animationPlayState = 'running';
//                     });
//                 } else {
//                     if (mediaRecorder.state === 'recording') {
//                         mediaRecorder.pause();
//                         clearInterval(timerInterval);
//                         playPauseButton.querySelector('img').src = '../../img/icons/play-icon.svg';
//                         document.querySelectorAll('#wave span').forEach(span => {
//                             span.style.animationPlayState = 'paused';
//                         });
//                     } else if (mediaRecorder.state === 'paused') {
//                         mediaRecorder.resume();
//                         startTime = new Date().getTime() - (startTime - new Date().getTime());
//                         timerInterval = setInterval(updateTimer, 1000);
//                         playPauseButton.querySelector('img').src = '../../img/icons/pause-icon.svg';
//                         document.querySelectorAll('#wave span').forEach(span => {
//                             span.style.animationPlayState = 'running';
//                         });
//                     }
//                 }
//             });

//             cancelBtn.addEventListener('click', () => {
//                 audioContainer.style.display = 'flex';
//                 audioContainerRecording.style.display = 'none';
//                 mediaRecorder.stop();
//                 clearInterval(timerInterval);
//                 document.querySelectorAll('#wave span').forEach(span => {
//                     span.style.animationPlayState = 'paused';
//                 });
//             });

//             saveBtn.addEventListener('click', () => {
//                 if (mediaRecorder.state !== 'inactive') {
//                     mediaRecorder.stop();
//                     clearInterval(timerInterval);
//                     audioChunks = [];
//                     startTime = null;
//                     timerRecording.textContent = '00:00';
//                     playPauseButton.querySelector('img').src = '../../img/icons/play-icon.svg';
//                     isRecordingSaved = true;
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Error accessing audio input:', error);
//         });
// });
