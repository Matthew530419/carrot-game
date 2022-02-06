const carrotSound = new Audio('./sound/carrot_pull.mp3');

export default class Field {
    constructor(Carrot_Count, Bug_Count, Carrot_Size) {
        this.Carrot_Count = Carrot_Count;
        this.Bug_Count = Bug_Count;
        this.Carrot_Size = Carrot_Size;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', (event) => this.onClick(event));
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    init() {
        this.field.innerHTML = ``;
        this.addItem('carrot', this.Carrot_Count, 'img/carrot.png');
        this.addItem('bug', this.Bug_Count, 'img/bug.png');
    }

    addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.Carrot_Size;
        const y2 = this.fieldRect.height - this.Carrot_Size;
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

    onClick(event) {
        const target = event.target;
        if(target.matches('.carrot')) {
            target.remove();
            playSound(carrotSound);
            this.onItemClick && this.onItemClick('carrot');
        } else if(target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function playSound(sound) {
    sound.play();
    sound.currentTime = 0;
}