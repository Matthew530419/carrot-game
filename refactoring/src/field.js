import * as sound from './sound.js';

export const itemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
})

export default class Field {
    constructor(carrotCount, bugCount, carrotSize) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.carrotSize = carrotSize;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', (event) => this.onClick(event));
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    init() {
        this.field.innerHTML = ``;
        this.addItem(itemType.carrot, this.carrotCount, 'img/carrot.png');
        this.addItem(itemType.bug, this.bugCount, 'img/bug.png');
    }

    exit() {
        this.field.innerHTML = ``;
    }

    addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.carrotSize;
        const y2 = this.fieldRect.height - this.carrotSize;
        for(let i=0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
            //console.log('item count');
        }
    }

    onClick (event) {
        const target = event.target;
        if(target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(itemType.carrot);
        } else if(target.matches('.bug')) {
            this.onItemClick && this.onItemClick(itemType.bug);
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

