const started = document.querySelector('#started');
const stopped = document.querySelector('#stopped');
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

started.addEventListener('click', () => {
    document.addEventListener('mousemove', operation);
});

stopped.addEventListener('click', () => {
    document.removeEventListener('mousemove', operation); 
});



function operation (event) {
    const itemRow = document.createElement('div');
    itemRow.setAttribute('class', 'item__row');
    itemRow.innerHTML = `
        <div class="line horizontal"></div>
        <div class="line vertical"></div>
        <img src="./img/target.png" alt="target" class="target">
        <span class="tag"></span>
        <button id="started">started</button>
        <button id="stopped">stopped</button>
    `;
    let X = event.clientX;
    let Y = event.clientY;

    horizontal.style.top = `${Y}px`;
    vertical.style.left =  `${X}px`;
    target.style.left = `${X}px`;
    target.style.top = `${Y}px`;
    tag.style.left = `${X}px`;
    tag.style.top = `${Y}px`;
    tag.innerHTML = `${X}px, ${Y}px `;
}

