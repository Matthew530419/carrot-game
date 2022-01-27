'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gmaeScore = document.querySelector('.game__score');
const Carrot_Size = 80;
const Carrot_Count = 10;
const Bug_Count = 10;
const GAME_DURATION_SEC = 10;

let started = false;
let timer = undefined;

gameBtn.addEventListener('click', ()=> {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
})

function stopGame() {
    field.innerHTML= ``;
    showStartBtn();
    hideTimerandScore();
}

function showStartBtn() {
    if(!started) {
        return;
    }
    const icon = document.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function hideTimerandScore() {
    if(started){
        gameTimer.style.visibility = 'hidden';
        gmaeScore.style.visibility = 'hidden';
    }
}

function startGame() {
    showStopBtn();
    showTimerAndScore();
    initGame();
    startGameTimer();
}

function startGameTimer() {
    let RemainingTimeSec = GAME_DURATION_SEC;
    updateTimeText(RemainingTimeSec);
    timer = setInterval(() => {
        if(RemainingTimeSec <= 0){
            clearInterval();
            return;
        }
        updateTimeText(--RemainingTimeSec);
    }, 1000);
}

function updateTimeText(time) {
    const Minutes = Math.floor(time / 60);
    const Seconds = time % 60;
    gameTimer.innerText = `${Minutes} : ${Seconds}`;
}

function showStopBtn() {
    if(!started){
    const icon = document.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    }
}

function showTimerAndScore() {
    if(!started){
    gameTimer.style.visibility = 'visible';
    gmaeScore.style.visibility = 'visible';
    }
}

function initGame() {
    addItem('carrot', Carrot_Count, 'img/carrot.png');
    addItem('bug', Bug_Count, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - Carrot_Size;
    const y2 = fieldRect.height - Carrot_Size;
    for(let i=0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
