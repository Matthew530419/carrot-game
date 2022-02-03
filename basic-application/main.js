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
const Popup = document.querySelector('.pop-up');
const PopupText = document.querySelector('.pop-up__message');
const PopupBtn = document.querySelector('.pop-up__refresh');

let started = false;
let timer = undefined;

PopupBtn.addEventListener('click', ()=> {
    console.log(started);
    console.log('popupBtn');
    replayGame();
})

function replayGame() {
    started = false;
    console.log(started);
    console.log('replayGame');
    startGame();
    showGameBtn();
    hidePopupwithText();
}

function startGame() {
    started = true;
    console.log(started);
    console.log('startGame');
    field.innerHTML = ``;
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    initGame();
}

function stopGame() {
    started = false;
    console.log(started);
    console.log('stopGame');
    hideGameBtn();
    stopGameTimer();
    showPopupwithText('Replay?');
}

function showGameBtn() {
    gameBtn.style.visibility = 'visible';
}

function hidePopupwithText() {
    Popup.classList.add('pop-up--hide');
}

gameBtn.addEventListener('click', ()=> {
    console.log(started);
    console.log('gameBtn');
    if (started) {
        stopGame();
    } else {
        startGame();
    } 
})


function showPopupwithText(text) {
    Popup.classList.remove('pop-up--hide');
    PopupText.innerText = text;
}

function hideGameBtn() {
    gameBtn.style.visibility = 'hidden';
}

function stopGameTimer() {
    clearInterval(timer);
}

function showStopBtn() {
    const icon = document.querySelector('.fas');
    if(started){
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');    
    } else {
        return;
    }
}

function showTimerAndScore() {
    if(started){
    gameTimer.style.visibility = 'visible';
    gmaeScore.style.visibility = 'visible';
    }
}

function startGameTimer() {
    let RemainingTimeSec = GAME_DURATION_SEC;
    updateTimeText(RemainingTimeSec);
    timer = setInterval(() => {
        if(RemainingTimeSec <= 0){
            clearInterval(timer);   
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
