const horizontal = document.querySelector('.horizontal');
const verticle = document.querySelector('.verticle');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');
const start = document.querySelector('#start')

start.addEventListener('click', Random);

function Random (event) {
    const itemRow = document.createElement('div');
    itemRow.setAttribute('class', 'item__row');
    itemRow.innerHTML= `
        <div class="line horizontal"></div>
        <div class="line verticle"></div>
        <img class="target" src="./img/target.png" alt="target">
        <span class="tag"></span>
        <button class="start">start</button>
    `;

    let X1 = Math.floor((Math.random()*500)+1);
    let Y1 = Math.floor((Math.random()*500)+1);

    let X = event.clientX;
    let Y = event.clientY;

    X=X1;
    Y=Y1;

    horizontal.style.top = `${Y}px`;
    verticle.style.left = `${X}px`;
    target.style.top = `${Y}px`;
    target.style.left = `${X}px`;
    tag.style.top = `${Y}px`;
    tag.style.left = `${X}px`;
    tag.innerHTML = `${X}px, ${Y}px`;
    }
