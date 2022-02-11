'use strict';

import PopUp from './popup.js';
import GameBuilder, { Reason } from './game.js';
import * as sound from './sound.js';

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
        case Reason.cancel:
            message = 'Replay? or Exit';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You Won!'
            sound.playWin();
            break;
        case Reason.lose:
            message = 'You Lost!'
            sound.playBug();
            break;
        default:
            throw new Error('invalid reason');
    }
    sound.stopBackground();
    gameFinishpopUp.showWithText(message);
}) 