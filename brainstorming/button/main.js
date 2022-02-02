const play = document.querySelector('.play');

let started = false;

play.addEventListener('click', () => {
    showPauseBtn();
    started = !started;
})

function showPauseBtn() {
    const icon = document.querySelector('.fas');
    if(started){
        icon.classList.add('fa-pause');
        icon.classList.remove('fa-play');
    } else {
        icon.classList.add('fa-play');
        icon.classList.remove('fa-pause');
    }
    
    
}
