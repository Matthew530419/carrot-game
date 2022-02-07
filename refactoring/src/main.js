'use strict';

import Field from './field.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const Carrot_Size = 80;
const Carrot_Count = 10;
const Bug_Count = 10;
const GAME_DURATION_SEC = 10;

let started = false;
let timer = undefined;
let score = 0;

const gameFinishpopUp = new PopUp();

gameFinishpopUp.setClickListener('PopupBtn', replayGame);
gameFinishpopUp.setClickListener('exitBtn', exitGame);

const gameField = new Field(Carrot_Count, Bug_Count, Carrot_Size);

gameBtn.addEventListener('click', ()=> {
    //console.log(started);
    //console.log('gameBtn');
    if (started) {
        stopGame();
    } else {
        startGame();
    } 
})

gameField.setClickListener(onFieldClick);

function onFieldClick(item) {
    if(!started) {
        return;
    }
    //console.log('remove');
    if(item === 'carrot') {
        score++;
        updateScore();
        if(Carrot_Count === score) {
            finishGame(true);
        }
    } else if(item ==='bug') {
        finishGame(false);
    }
}

function exitGame() {
    console.log('exitGame');
    started = false;
    initScore();
    updateScore();
    hideTimerAndScore();
    stopGameTimer();
    showStopBtn();
    showGameBtn();
    sound.stopBackground();
    gameFinishpopUp.hide();
    gameField.exit();
}

function finishGame(win) {
    started = false;
    stopGameTimer();
    hideGameBtn();
    gameFinishpopUp.showWithText(win? 'You Won!' : 'You Lost!');
    if(Carrot_Count === score) {
        sound.playWin();
        sound.stopBackground();
    } else {
        sound.playBug();
        sound.stopBackground();
    }
}

function replayGame() {
    started = false;
    //console.log(started);
    //console.log('replayGame');
    initScore();
    updateScore();
    startGame();
    showGameBtn();
    gameFinishpopUp.hide();
}

function startGame() {
    started = true;
    //console.log(started);
    //console.log('startGame');
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    initGame();
    sound.playBackground();
}

function stopGame() {
    started = false;
    //console.log(started);
    //console.log('stopGame');
    hideGameBtn();
    stopGameTimer();
    gameFinishpopUp.showWithText('Replay? or Exit?');
    sound.stopBackground();
    sound.playAlert();
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
    gameField.init();
}
