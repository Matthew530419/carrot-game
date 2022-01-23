'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const carrotSize = 80;

function initGame() {
    console.log(fieldRect);
    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - carrotSize;
    const y2 = fieldRect.height - carrotSize;
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
        console.log(`X: ${x}px, Y: ${y}px`);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

initGame();