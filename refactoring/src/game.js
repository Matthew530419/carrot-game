'use strict';

import Field from './field.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

export default class Game {
    constructor(gameDurationSec, carrotCount, bugCount, carrotSize) {
        this.gameDurationSec = gameDurationSec;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.carrotSize = carrotSize;
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.started = false;
        this.timer = undefined;
        this.score = 0;
        this.gameFinishpopUp = new PopUp();
        this.gameFinishpopUp.setClickListener('PopupBtn', this.replay);
        this.gameFinishpopUp.setClickListener('exitBtn', this.exit);
        this.gameField = new Field(this.carrotCount, this.bugCount, this.carrotSize);
        this.gameField.setClickListener(this.onFieldClick);
        this.gameBtn.addEventListener('click', ()=> {
            if (this.started) {
                this.stop();
            } else {
                this.start();
            } 
        })
    }
    onFieldClick = (item) => {
    if(!this.started) {
        return;
    }
    if(item === 'carrot') {
        this.score++;
        this.updateScore();
        if(this.carrotCount === this.score) {
            this.finish(true);
        }
    } else if(item ==='bug') {
        this.finish(false);
    }
    }
    exit = () => {
    this.started = false;
    this.initScore();
    this.updateScore();
    this.hideTimerAndScore();
    this.stopGameTimer();
    this.showStopBtn();
    this.showGameBtn();
    sound.stopBackground();
    this.gameFinishpopUp.hide();
    this.gameField.exit();
    }

    replay = () => {
        this.started = false;
        this.initScore();
        this.updateScore();
        this.start();
        this.showGameBtn();
        this.gameFinishpopUp.hide();
    }

    setgameStopListener(onGamestop){
        this.onGamestop = onGamestop;
    }

    finish(win) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameBtn();
    this.onGamestop && this.onGamestop(win? 'win' : 'lose');
    if(this.carrotCount === this.score) {
        sound.playWin();
        sound.stopBackground();
    } else {
        sound.playBug();
        sound.stopBackground();
    }
    }

    stop() {
    this.started = false;
    this.hideGameBtn();
    this.stopGameTimer();
    this.onGamestop && this.onGamestop('cancel');
    sound.stopBackground();
    sound.playAlert();
    }

    start() {
    this.started = true;
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    this.initGame();
    sound.playBackground();
    }

    initScore() {
    if (this.finish) {
        this.score = 0;
    }
    }

    updateScore() {
    this.gameScore.innerText = this.carrotCount - this.score;
    }

    showGameBtn() {
    this.gameBtn.style.visibility = 'visible';
    }

    hideGameBtn() {
    this.gameBtn.style.visibility = 'hidden';
    }

    showStopBtn() {
    const icon = document.querySelector('.fas');
    if(this.started){
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');    
    } else {
        icon.classList.add('fa-play');
        icon.classList.remove('fa-stop');
    }
    }

    hideTimerAndScore() {
    if(!this.started){
    this.gameTimer.style.visibility = 'hidden';
    this.gameScore.style.visibility = 'hidden';
    }
    }

    showTimerAndScore() {
    if(this.started){
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
    }
    }

    stopGameTimer() {
    clearInterval(this.timer);
    }

    startGameTimer() {
    let RemainingTimeSec = this.gameDurationSec;
    this.updateTimeText(RemainingTimeSec);
    this.timer = setInterval(() => {
        if(RemainingTimeSec <= 0){
            clearInterval(this.timer); 
            this.finish(this.carrotCount === this.score);
            return;
        }
        this.updateTimeText(--RemainingTimeSec);
    }, 1000);
    }

    updateTimeText(time) {
    const Minutes = Math.floor(time / 60);
    const Seconds = time % 60;
    this.gameTimer.innerText = `${Minutes} : ${Seconds}`;
    }

    initGame() {
    this.gameField.init();
    }

}