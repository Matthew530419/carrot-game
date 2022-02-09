'use strict';

import PopUp from './popup.js';
import GameBuilder from './game.js';

const Carrot_Size = 80;
const Carrot_Count = 10;
const Bug_Count = 10;
const GAME_DURATION_SEC = 10;

const gameFinishpopUp = new PopUp();

const game = new GameBuilder()
.gameDuration(10)
.carrotCount(10)
.bugCount(10)
.carrotSize(80)
.build();

game.setgameStopListener((reason) => {
    let message;
    switch (reason) {
        case 'cancel':
            message = 'Replay? or Exit';
            break;
        case 'win':
            message = 'You Won!'
            break;
        case 'lose':
            message = 'You Lost!'
            break;
        default:
            throw new Error('invalid reason');
    }
    gameFinishpopUp.showWithText(message);
}) 