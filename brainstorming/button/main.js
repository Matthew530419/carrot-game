const play = document.querySelector('.play');
const pause = document.querySelector('#pause');

document.querySelector('#pause').style.display = 'none';

play.addEventListener('click', () => {
    play.innerHTML = `<i class="fas fa-pause"></i>`;
})

pause.addEventListener('click', () => {
    pause.innerHTML = `<i class="fas fa-pause"></i>`;
})