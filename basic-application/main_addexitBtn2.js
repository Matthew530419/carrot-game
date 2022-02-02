'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const Carrot_Size = 80;
const Carrot_Count = 10;
const Bug_Count = 10;
const GAME_DURATION_SEC = 10;
const Popup = document.querySelector('.pop-up');
const PopupText = document.querySelector('.pop-up__message');
const PopupBtn = document.querySelector('.pop-up__refresh');
const exitBtn = document.querySelector('.pop-up__exit');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let timer = undefined;
let score = 0;

exitBtn.addEventListener('click', ()=> {
    exitGame();
})

gameBtn.addEventListener('click', ()=> {
    console.log(started);
    console.log('gameBtn');
    if (started) {
        stopGame();
    } else {
        startGame();
    } 
})

PopupBtn.addEventListener('click', ()=> {
    console.log(started);
    console.log('popupBtn');
    replayGame();
})

field.addEventListener('click', onFieldClick);

function onFieldClick(event) {
    if(!started) {
        return;
    }
    console.log('remove');
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound);
        updateScore();
        if(Carrot_Count === score) {
            finishGame(true);
        }
    } else if(target.matches('.bug')) {
        finishGame(false);
    }
}

function playSound(sound) {
    sound.play();
    sound.currentTime = 0;
}

function pauseSound(sound) {
    sound.pause();
}

function exitGame() {
    console.log('exitGame');
    started = false;
    field.innerHTML = ``;
    initScore();
    updateScore();
    hideTimerAndScore();
    stopGameTimer();
    showStopBtn();
    showGameBtn();
    pauseSound(bgSound);
    hidePopupwithText();
}

function finishGame(win) {
    started = false;
    stopGameTimer();
    hideGameBtn();
    showPopupwithText(win? 'You Won!' : 'You Lost!');
    if(Carrot_Count === score) {
        playSound(winSound);
        pauseSound(bgSound);
    } else {
        playSound(bugSound);
        pauseSound(bgSound);
    }
}

function replayGame() {
    started = false;
    console.log(started);
    console.log('replayGame');
    initScore();
    updateScore();
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
    playSound(bgSound);
}

function stopGame() {
    started = false;
    console.log(started);
    console.log('stopGame');
    hideGameBtn();
    stopGameTimer();
    showPopupwithText('Replay? or Exit?');
    pauseSound(bgSound);
    playSound(alertSound);
}

function initScore() {
    if (finishGame) {
        score = 0;
    }
}

function updateScore() {
    gameScore.innerText = Carrot_Count - score;
}

function showGameBtn() {
    gameBtn.style.visibility = 'visible';
}

function hideGameBtn() {
    gameBtn.style.visibility = 'hidden';
}

function showPopupwithText(text) {
    Popup.classList.remove('pop-up--hide');
    PopupText.innerText = text;
}

function hidePopupwithText() {
    Popup.classList.add('pop-up--hide');
}

function showStopBtn() {
    const icon = document.querySelector('.fas');
    if(started){
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');    
    } else {
        icon.classList.add('fa-play');
        icon.classList.remove('fa-stop');
    }
}


function hideTimerAndScore() {
    if(!started){
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
    }
}

function showTimerAndScore() {
    if(started){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
    }
}

function stopGameTimer() {
    clearInterval(timer);
}

function startGameTimer() {
    let RemainingTimeSec = GAME_DURATION_SEC;
    updateTimeText(RemainingTimeSec);
    timer = setInterval(() => {
        if(RemainingTimeSec <= 0){
            clearInterval(timer); 
            finishGame(Carrot_Count === score);
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