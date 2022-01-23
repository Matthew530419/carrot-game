const horizontal = document.querySelector('.horizontal');
const verticle = document.querySelector('.verticle');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

class Lis {
    constructor(runEventTimes) {
        this.callback = runEventTimes;
    }
    random() {
        let X1 = Math.floor((Math.random()*100)+100);
        let Y1 = Math.floor((Math.random()*100)+100);
        console.log(`X1: ${X1}, Y1 = ${Y1}`);
        console.log(this.callback());
    }
}

function coordinate() {
    console.log('what?')
}

const value = new Lis(coordinate);

value.random();

//document.addEventListener('mousemove', (event) => {
//    let X = event.clientX;
//    let Y = event.clientY;
//    X = X1;
//    Y = Y1;
//    horizontal.style.top = `${Y1}px`;
//    verticle.style.left = `${X1}px`;
//    target.style.top = `${Y1}px`;
//    target.style.left = `${X1}px`;
//    tag.style.top = `${Y1}px`;
//    tag.style.left = `${X1}px`;
//    tag.innerHTML = `${X1}px, ${Y1}px`;


//id.addEventListener('click', (event) => {
//    event.target.removeEventListener('mousemove', () => {
//        handlecoordinate();
//    }) 
//})

//horizontal.style.top = `${Y1}px`;
//    verticle.style.left = `${X1}px`;
//    target.style.top = `${Y1}px`;
//    target.style.left = `${X1}px`;
//    tag.style.top = `${Y1}px`;
//    tag.style.left = `${X1}px`;
//    tag.innerHTML = `${X1}px, ${Y1}px`;