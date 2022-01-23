//const timer = document.querySelector('#timer');
const timer = document.getElementById('timer');

let counter = 10;
let timer1 = setInterval(() => {
    counter--;
    timer.textContent = counter;
    if (counter === 0) {
        clearInterval(timer1);
        return timer1;
    }
}, 1000);