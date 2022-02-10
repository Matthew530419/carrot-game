'use strict';

import PopUp from './popup.js';
import GameBuilder, { Reason } from './game.js';

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
            break;
        case Reason.win:
            message = 'You Won!'
            break;
        case Reason.lose:
            message = 'You Lost!'
            break;
        default:
            throw new Error('invalid reason');
    }
    gameFinishpopUp.showWithText(message);
}) 