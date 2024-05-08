
// const stepButtons = document.querySelectorAll('.step-button');
// const progress = document.querySelector('#progress');

// Array.from(stepButtons).forEach((button,index) => {
//     button.addEventListener('click', () => {
//         progress.setAttribute('value', index * 100 /(stepButtons.length - 1) );

//         stepButtons.forEach((item, secindex)=>{
//             if(index > secindex){
//                 item.classList.add('done');
//             }
//             if(index < secindex){
//                 item.classList.remove('done');
//             }
//         })
//     })
// })








const stepButtons = document.querySelectorAll('.step-button');
const progress = document.querySelector('#progress');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');

Array.from(stepButtons).forEach((button,index) => {
    button.addEventListener('click', () => {
        progress.setAttribute('value', index * 100 /(stepButtons.length - 1) );

        stepButtons.forEach((item, secindex)=>{
            if(index > secindex){
                item.classList.add('done');
            }
            if(index < secindex){
                item.classList.remove('done');
            }
        })
    })
});

nextButton.addEventListener('click', () => {
    const currentButton = document.querySelector('.step-button[aria-expanded="true"]');
    const currentIndex = Array.from(stepButtons).indexOf(currentButton);
    if (currentIndex < stepButtons.length - 1) {
        stepButtons[currentIndex + 1].click();
    }
});

prevButton.addEventListener('click', () => {
    const currentButton = document.querySelector('.step-button[aria-expanded="true"]');
    const currentIndex = Array.from(stepButtons).indexOf(currentButton);
    if (currentIndex > 0) {
        stepButtons[currentIndex - 1].click();
    }
});
